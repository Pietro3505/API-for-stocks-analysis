const mongoose = require('mongoose')
const Joi = require('joi');
const {tickerSchema} = require('./tickerInfo')

const evaluationSchema = new mongoose.Schema({
    title: String, 
    evaluation: String,
    url: String,
    containsYes: Boolean,
    request: {type: tickerSchema}
})

const Evaluation = mongoose.model("Evaluation", evaluationSchema);


function validateEvaluationInput (input) {
    const schema = Joi.object({
        title: Joi.string().min(5),
        evaluation: Joi.string().min(10),
        url: Joi.string(),
        containsYes: Joi.boolean()
    });

    return schema.validate(input);
}


module.exports.validateEvaluation = validateEvaluationInput;
module.exports.Evaluation = Evaluation;