const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const {Ticker} = require('../models/tickers');
const {Indicator} = require('../models/indicators');
const {Evaluation} = require('../models/evaluations');
const {validateEvaluationFilter, validateIndicatorFilter } = require('../models/filters');


router.get('/', async (req, res) => {

    const evaluations = await Evaluation.find({});
    res.send(evaluations)
});

router.post('/evaluations', async (req, res) => {

    const {error} = validateEvaluationFilter(req.body);
    if (error) return res.status(400).send(error.message);

    const dateFrom = Date.parse(req.body.dateFrom)
    const dateTo =  Date.parse(req.body.dateTo)
    const tickers = req.body.tickers
    
    const evaluations = await Evaluation.find({"symbol": {$in: tickers}, "date": {"$gte": dateFrom, "$lte": dateTo}}).exec()
        res.send(evaluations)
});

router.post('/indicators', async (req, res) => {
    
    const {error} = validateIndicatorFilter(req.body);
    if (error) return res.status(400).send(error.message);

    const tickers = req.body.tickers
    
    const indicators = await Indicator.find({"symbol": {$in: tickers}})
    res.send(indicators)
});


module.exports = router;

const filter = {"symbol": {"$in": ["ADBE", "AAPL"]}}
//{$in: ['some title', 'some other title']}
//,