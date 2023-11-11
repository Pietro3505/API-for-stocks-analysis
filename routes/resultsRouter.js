const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const {Ticker, validateTicker} = require('../models/tickers');
const {evaluateTicker} = require('../models/evaluations');
const {tickerIndicator} = require('../models/indicators');


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
    let indicatorsCollection = []

    async function iterate() {
        for (let index = 0; index < tickerRequest.tickers.length; index++) {
            const element = tickerRequest.tickers[index];
            
            const elementEvaluation = await evaluateTicker(tickerRequest, element)
                evaluationsCollection.push(elementEvaluation)
            const elementIndicators = await tickerIndicator(element);
                indicatorsCollection.push(elementIndicators)
        }
        return [indicatorsCollection, evaluationsCollection]
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