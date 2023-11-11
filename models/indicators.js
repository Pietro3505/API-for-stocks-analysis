const mongoose = require('mongoose')
const Joi = require('joi');
const {searchIndicators} = require('../logic/newsRequests');

const indicatorSchema = new mongoose.Schema({
Symbol: {type: String, required: true},
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
        Symbol: Joi.string.min(1).max(256),      
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


async function tickerIndicator(ticker) {
    const indicators =  await searchIndicators(ticker);
    const keyMetrics = indicators[0][0];
    const ratios = indicators[1][0];
        const companyIndicator = new Indicator({
            Symbol: ratios.symbol,
            EPS: ratios.priceEarningsRatio,
            ROA: ratios.returnOnAssets,
            ROE: ratios.returnOnEquity,
            ROIC: ratios.returnOnCapitalEmployed,
            OperatingMargin: ratios.operatingProfitMargin,
            DebtToEquity: ratios.debtEquityRatio,
            FreeCashFlowYield: keyMetrics.freeCashFlowYield
        });
        try{
            await companyIndicator.save()
        }catch(err){throw new Error(err)}
        
    return companyIndicator
}


module.exports.validateIndicator = validateIndicatorInput;
module.exports.Indicator = Indicator;
module.exports.tickerIndicator = tickerIndicator
