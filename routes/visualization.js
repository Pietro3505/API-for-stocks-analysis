const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const {Ticker, validateTicker} = require('../models/tickerInfo');
const {Evaluation, validateEvaluation} = require('../models/evaluations');
const {searchIndicators} = require('../logic/newsRequests.js');



router.get('/', async (req, res) => {
    
    const result = await searchIndicators(req.body.ticker);
    res.send(result);
});


module.exports = router;