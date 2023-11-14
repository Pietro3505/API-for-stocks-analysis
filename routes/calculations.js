const express = require("express");
const router = express.Router();
const {validateCalculation} = require('../models/filters');
const {Evaluation, calculateGTPScore} = require('../models/evaluations');




router.post('/', async (req, res) => {
    const {error} = validateCalculation(req.body);
    if (error) return res.status(400).send(error.message);
   
    const dateFrom = Date.parse(req.body.dateFrom)
    const dateTo =  Date.parse(req.body.dateTo)
    const symbol = req.body.symbol
    
    const evaluations = await Evaluation.find({"symbol":symbol, "date": {"$gte": dateFrom, "$lte": dateTo}}).exec()

    if (evaluations.length !== 0) {
        res.send(calculateGTPScore(evaluations));
    } else {
        res.send("No evaluation Found")
    }
});




module.exports = router;

