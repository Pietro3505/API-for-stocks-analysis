const mongoose = require('mongoose')
const Joi = require('joi');


const tickerSchema = new mongoose.Schema({
    tickers: [String], 
    dateFrom: String,
    dateTo: String
})

const TickerSend = mongoose.model("TickerSend", tickerSchema);


function validateTickerInput (input) {
    const schema = Joi.object({
        tickers: Joi.array().items(Joi.string().min(1).max(256)).min(1).required(),
        dateFrom: Joi.date().iso().required(),
        dateTo: Joi.date().iso().required()
    });

    return schema.validate(input);
}

module.exports.tickerSchema = tickerSchema;
module.exports.validateTicker = validateTickerInput;
module.exports.Ticker = TickerSend;