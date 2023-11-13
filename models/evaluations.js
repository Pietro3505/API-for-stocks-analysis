const mongoose = require('mongoose')
const Joi = require('joi');
const {searchNews} = require('../logic/newsRequests');
const {chatGPTCompletion} = require('../logic/openAi');

async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


const evaluationSchema = new mongoose.Schema({
    title: String, 
    evaluation: String,
    url: String,
    containsYes: Boolean,
    containsNo: {type: Boolean, default: false},
    date: Number,
    symbol: String,
})

const Evaluation = mongoose.model("Evaluation", evaluationSchema);


function validateEvaluationInput (input) {
    const schema = Joi.object({
        title: Joi.string().min(5).required(),
        evaluation: Joi.string().min(10).required(),
        url: Joi.string().required(),
        containsYes: Joi.boolean().required(),
        containsNo: Joi.boolean().required(),
        date: Joi.date().iso().required(),
        symbol: Joi.string().min(1).max(256).required()
    });

    return schema.validate(input);
}

async function evaluateTicker (tickerRequest, ticker) {

    let evaluationsArray = []

        const news = await searchNews(tickerRequest, ticker)

        for (let index = 0; index < news.articles.length; index++) {
            if(news.articles[index].symbols.length === 1){

                const result = await chatGPTCompletion(news.articles[index].title)
                    const tickerEvaluation = new Evaluation ({
                        title: news.articles[index].title,
                        evaluation: result,
                        url: news.articles[index].sourceUrl,
                        containsYes: result.includes('YES'),
                        containsNo: includesNO(result),
                        date: Date.parse(news.articles[index].publishedAt),
                        symbol: news.articles[index].symbols[0]
                    })
                    const compareObject = await Evaluation.find({url: news.articles[index].sourceUrl});
                    if (compareObject.length === 0) {
                        try{
                            await tickerEvaluation.save()
                        }catch(err){
                            throw new Error(err)
                        }
                    }
                    evaluationsArray.push(tickerEvaluation)
                if (index < news.articles.length - 1) {await delay(20000)}
            }
          
        }

        return evaluationsArray
}


function includesNO (result) {
    if (result.includes('NO') && !result.includes('UNKNOWN')) {
        return true
    } else if (!result.includes('NO')) {
        return false
    }
}

function calculateGTPScore (evaluations) {
    let containsYes = 0
    let containsNo = 0
    let totalCount = evaluations.length

    for (let i = 0; i < evaluations.length; i++) {
        const element = evaluations[i];

        if (element.containsYes === true) {
            containsYes ++
        } else if (element.containsNo === true) {
             containsNo++
        }
        
    }
    let yesScore = (containsYes*100)/totalCount;
    let noScore = (containsNo*100)/totalCount;

    return [yesScore, noScore]
}

module.exports.validateEvaluation = validateEvaluationInput;
module.exports.Evaluation = Evaluation;
module.exports.evaluateTicker = evaluateTicker;
module.exports.calculateGTPScore = calculateGTPScore;