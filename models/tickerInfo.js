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
        tickers: Joi.array().items(Joi.string()).min(1),
        dateFrom: Joi.date().iso(),
        dateTo: Joi.date().iso()
    });

    return schema.validate(input);
}


module.exports.validateTicker = validateTickerInput;
module.exports.Ticker = TickerSend;