const mongoose = require('mongoose')
const Joi = require('joi');

const indicatorSchema = new mongoose.Schema({
EPS: {type: Number, required: true},
ROA: {type: Number, required: true},
ROE: {type: Number, required: true},
ROIC: {type: Number, required: true},
OperatingMargin: {type: Number, required: true},
DebtToEquity: {type: Number, required: true},
FreeCashFlowYield: {type: Number, required: true}
})

const Indicator = mongoose.model("Indicator", indicatorSchema);


function validateIndicatorInput (input) {
    const schema = Joi.object({      
        EPS: Joi.number().min(0).max(100),
        ROA: Joi.number().min(0).max(100),
        ROE: Joi.number().min(0).max(100),
        ROIC: Joi.number().min(0).max(100),
        OperatingMargin: Joi.number().min(0).max(100),
        DebtToEquity: Joi.number().min(0).max(100),
        FreeCashFlowYield: Joi.number().min(0).max(100)

    });

    return schema.validate(input);
}


module.exports.validateIndicator = validateIndicatorInput;
module.exports.Indicator = Indicator;
