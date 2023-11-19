const express = require("express");
const router = express.Router();
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
    
    const evaluations = await searchEvaluations(tickers, dateFrom, dateTo)
    res.send(evaluations)
});

router.post('/indicators', async (req, res) => {
    
    const {error} = validateIndicatorFilter(req.body);
    if (error) return res.status(400).send(error.message);

    const tickers = req.body.tickers
    
    const indicators = await searchIndicators(tickers)
    res.send(indicators)
});

async function searchEvaluations (tickers, dateFrom, dateTo) {
    let collection = []
    for (let i = 0; i < tickers.length; i++) {
        const element = tickers[i];
        const evaluations = await Evaluation.find({"symbol":element, "date": {"$gte": dateFrom, "$lte": dateTo}}).exec()
        if (evaluations.length !== 0) {
            collection.push(evaluations)
        } else {
            collection.push({
                symbol: element,
                description: 'No Evaluations Found'
            })
        }
    }
        return collection
}

async function searchIndicators (tickers) {
    let collection = []
    for (let i = 0; i < tickers.length; i++) {
        const element = tickers[i];
        const indicators = await Indicator.find({"symbol": element})
        if (indicators.length !== 0) {
            collection.push(indicators)
        } else {
            collection.push({
                symbol: element,
                description: 'No Indicators Found'
            })
        }
    }
        return collection
}

module.exports = router;
