const mongoose = require('mongoose')
const Joi = require('joi');


const tickerSchema = new mongoose.Schema({
    tickers: [String], 
    dateFrom: {type: Date, default: Date.now},
    dateTo: {type: Date, default: Date.now}
})

const TickerSend = mongoose.model("TickerSend", tickerSchema);


function validateTickerInput (input) {
    const schema = Joi.object({
        tickers: Joi.array().items(Joi.string()).min(1),
        dateFrom: Joi.date(),
        dateTo: Joi.date()
    });

    return schema.validate(input);
}


module.exports.validateTicker = validateTickerInput;
module.exports.Ticker = tickerSchema;