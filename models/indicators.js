const mongoose = require('mongoose')
const Joi = require('joi');

const indicatorSchema = new mongoose.Schema({
EPS: String,
ROA: String,
ROE: String
})

const Indicator = mongoose.model("Indicator", indicatorSchema);


function validateIndicatorInput (input) {
    const schema = Joi.object({      
        EPS: Joi.number().min(0).max(100),
        ROA: Joi.number().min(0).max(100),
        ROE: Joi.number().min(0).max(100),
    });

    return schema.validate(input);
}


module.exports.validateIndicator = validateIndicatorInput;
module.exports.Indicator = Indicator;
