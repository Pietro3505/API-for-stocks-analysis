const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const {Ticker, validateTicker} = require('../models/tickerInfo');
const {Evaluation, validateEvaluation} = require('../models/evaluations');
const {Indicator, validateIndicator} = require('../models/indicators');
const {searchNews, searchIndicators} = require('../logic/newsRequests');
const {chatGPTCompletion} = require('../logic/openAi');

async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


router.get('/', async (req, res) => {
    const tickers = await Ticker.find()
    res.send(tickers);
});

router.post('/', async (req, res) => {

    const {error} = validateTicker(req.body);
    if (error) return res.status(400).send(error.message);
    
    const tickerRequest = new Ticker({
        tickers: req.body.tickers,
        dateFrom: req.body.dateFrom,
        dateTo: req.body.dateTo
    })

   
    let evaluationsCollection = [];
    let indicatorsArray = []

    async function tickerIndicators(ticker) {
        const indicators =  await searchIndicators(ticker);
        const keyMetrics = indicators[0][0];
        const ratios = indicators[1][0];

            // indicatorsArray.push(new Indicator({
            //     EPS: indicators1.EPS,
            //     ROA: indicators1.ReturnOnAssetsTTM,
            //     ROE: indicators1.ReturnOnEquityTTM
            // }));
            
        return [keyMetrics, ratios]
    }

    async function evaluateTicker (ticker) {
        
        const news = await searchNews(tickerRequest, ticker)
            for (let index = 0; index < news.articles.length; index++) {
                
                const result = await chatGPTCompletion(news.articles[index].title)
                    evaluationsCollection.push(new Evaluation ({
                        title: news.articles[index].title,
                        evaluation: result,
                        containsYes: result.includes('YES'),
                        url: news.articles[index].sourceUrl,
                        symbols: news.articles[index].symbols,
                    }))

            if (index < news.articles.length - 1) {
                await delay(20000);
            }
        }

            return
    }
    
    async function iterate() {
        for (let index = 0; index < tickerRequest.tickers.length; index++) {
            const element = tickerRequest.tickers[index];
            //await Promise.all([evaluateTicker(element), tickerIndicators(element)])
            const results = await tickerIndicators(element);
            indicatorsArray.push(results)
        }
        //console.log(indicatorsArray)
        //return evaluationsCollection
        return indicatorsArray
    }


    const evaluations = await iterate()
        res.send(evaluations)
        res.end()
        
});


router.put('/', (req, res) => {

    const {error} = validateTicker(req.body);
    if (error) return res.status(400).send(error.message);
    


});

router.delete('/', (req, res) => {});



module.exports = router;