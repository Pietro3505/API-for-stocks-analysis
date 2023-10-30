const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const {Ticker, validateTicker} = require('../models/tickerInfo');
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

    
    
    evaluations = [];


    async function response () {
        
    const news = await ask(tickerRequest)
    for (let index = 0; index < news.articles.length; index++) {
            
            evaluations.push(await chatGPTCompletion(news.articles[index].title));
    
    }

            return evaluations
    }
    const responseSend = await response()
    res.send(responseSend)

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