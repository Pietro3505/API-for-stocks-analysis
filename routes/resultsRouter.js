const express = require("express");
const router = express.Router();
const {Ticker, validateTicker} = require('../models/tickerInfo');

router.get('/api/:id', (req, res) => {
    res.send(req.params.id);
});

router.post('/', (req, res) => {

    const {error} = validateTicker(req.body);
    if (error) return res.status(400).send(error.message);
    
    

});

router.put('/', (req, res) => {

    const {error} = validateTicker(req.body);
    if (error) return res.status(400).send(error.message);
    


});

router.delete('/', (req, res) => {});




module.exports = router;