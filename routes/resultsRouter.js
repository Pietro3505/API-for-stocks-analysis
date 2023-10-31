const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const {Ticker, validateTicker} = require('../models/tickerInfo');
const {Evaluation, validateEvaluation} = require('../models/evaluations');
const {ask} = require('../logic/newsRequests');
const {chatGPTCompletion} = require('../logic/openAi');


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

    
    
    let evaluations = [];
    let evaluationResponse = [];

    async function response () {
        
    const news = await ask(tickerRequest)
    for (let index = 0; index < news.articles.length; index++) {
            
       const result = await chatGPTCompletion(news.articles[index].title)
            evaluationResponse.push(new Evaluation ({
                title: news.articles[index].title,
                evaluation: result,
                url: news.articles[index].sourceUrl,
                containsYes: result.includes('YES'),
                request: tickerRequest
            }))
    }
        return evaluationResponse
    }

    const result = await response()
        res.send(result)
        res.end()
    
    try {
        //await tickerRequest.save();
    }
    catch (ex) {
     res.status(500).send("Something Failed")
    }
    
    
});


router.put('/', (req, res) => {

    const {error} = validateTicker(req.body);
    if (error) return res.status(400).send(error.message);ˀ
    


});

router.delete('/', (req, res) => {});




module.exports = router;