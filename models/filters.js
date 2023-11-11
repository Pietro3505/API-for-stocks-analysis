const mongoose = require('mongoose')
const Joi = require('joi');

const filterSchema = new mongoose.Schema({
    conditions: {type: {
        tickers: {type: [String], required: true},
        dateFrom: {type: Date, required: true},
        dateTo: {type: Date, required: true}
    }, required: true},
    projection: {type: [] , required: true}
})
    
const Filter = mongoose.model("Filter", filterSchema);


function validateFilterInput (input) {
    const schema = Joi.object({
        conditions: {
            tickers: Joi.array().items(Joi.string().min(1).max(256)).min(1).required(),
            dateFrom: Joi.date().iso().required(),
            dateTo: Joi.date().iso().required(),
        },
        projection: Joi.array().items(Joi.string().min(1)).min(1)

    });

    return schema.validate(input);
}


module.exports.Filter = Filter
module.exports.validateFilter = validateFilterInput