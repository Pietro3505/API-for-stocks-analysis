const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const {Ticker, validateTicker} = require('../models/tickerInfo');
const {Evaluation, validateEvaluation} = require('../models/evaluations');
const {ask} = require('../logic/newsRequests');
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

    async function evaluateTicker () {
        const news = await ask(tickerRequest)
            for (let index = 0; index < news.articles.length; index++) {
            
                const result = await chatGPTCompletion(news.articles[index].title)
                    evaluationsCollection.push(new Evaluation ({
                        title: news.articles[index].title,
                        evaluation: result,
                        url: news.articles[index].sourceUrl,
                        containsYes: result.includes('YES'),
                        symbols: news.articles[index].symbols,
                        request: tickerRequest
                    }))

            if (index < news.articles.length - 1) {
                await delay(20000);
            }
        }

            return evaluationsCollection
    }
    
    const evaluations = await evaluateTicker()
        res.send(evaluations)
        res.end()
        
});


router.put('/', (req, res) => {

    const {error} = validateTicker(req.body);
    if (error) return res.status(400).send(error.message);
    


});

router.delete('/', (req, res) => {});




module.exports = router;