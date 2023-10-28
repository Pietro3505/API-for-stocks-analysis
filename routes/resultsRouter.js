const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const {Ticker, validateTicker} = require('../models/tickerInfo');
const {ask} = require('../logic/newsRequests');

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
    try {
        await tickerRequest.save();
    }
    catch (ex) {
        res.status(500).send("Something Failed")
    }
    
    ask(tickerRequest);
    res.send(tickerRequest);
});

router.put('/', (req, res) => {

    const {error} = validateTicker(req.body);
    if (error) return res.status(400).send(error.message);
    


});

router.delete('/', (req, res) => {});




module.exports = router;