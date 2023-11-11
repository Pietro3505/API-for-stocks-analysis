const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const {Ticker} = require('../models/tickers');
const {Indicators} = require('../models/tickers');
const {Evaluation} = require('../models/evaluations');
const {Filter, validateFilter} = require('../models/filters');




router.get('/evaluations', async (req, res) => {

    const {error} = validateFilter(req.body);
    if (error) return res.status(400).send(error.message);

    const filterRequest = new Filter({
        conditions: {
            tickers: req.body.tickers,
            dateFrom: req.body.dateFrom,
            dateTo: req.body.dateTo,
        },
        projection: [req.body.projection]
    })

    const dateFrom = Date.parse(req.body.conditions.dateFrom)
    const dateTo =  Date.parse(req.body.conditions.dateTo)
    const tickers = req.body.conditions.tickers
    const filter_stage = {"date": {"$gte": dateFrom, "$lte": dateTo}}
    
    

    // const filter = filterRequest.conditions;
    const evaluations = await Evaluation.find({"symbol": {$in: tickers}, "date": {"$gte": dateFrom, "$lte": dateTo}}).exec()
        res.send(evaluations)
});

router.get('/indicators', async (req, res) => {

    const {error} = validateFilter(req.body);
    if (error) return res.status(400).send(error.message);

    const evaluations = await Evaluation.find({})
    res.send(evaluations)
});


module.exports = router;

const filter = {"symbol": {"$in": ["ADBE", "AAPL"]}}
//{$in: ['some title', 'some other title']}
//,