const express = require("express");
const Joi = require('joi');
const router = express.Router();

router.get('/api/:id', (req, res) => {
    res.send(req.params.id);
});

router.post('/api', (req, res) => {

    const {error} = validateInput(req.body);
    const {value} = validateInput(req.body);

    if (error) return res.status(400).send(error.message);
    
    res.send(value);
});

router.put('/api', (req, res) => {

    const {error} = validateInput(req.body);
    const {value} = validateInput(req.body);

    if (error) return res.status(400).send(error.message);
    
    res.send(value);

});

router.delete('/api', (req, res) => {});


function validateInput (input) {
    const schema = Joi.object({
        tickers: Joi.array().items(Joi.string()).min(1),
        dateFrom: Joi.date(),
        dateTo: Joi.date()
    });

    return schema.validate(input);
}



module.exports = router;