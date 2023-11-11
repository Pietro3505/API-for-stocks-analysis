const {Ticker} = require('../models/tickers');
const { SearchApi } = require('financial-news-api');
const searchApi = SearchApi('8e7351bacd5a46a58edd7baab64a24c0692e03c9eb684eb7a00f649b492e1461');
const https =  require('https');


function searchNews (ticker = new Ticker, individualTicker) {
    const query = {
        queryString: `symbols:${individualTicker} AND publishedAt:[${ticker.dateFrom} TO ${ticker.dateTo}]`,
        from: 0,
        size: 15,
      };

      return  searchApi.getNews(query)
}



async function searchKeyMetrics (individualTicker) {
    let data = [];
    return new Promise((resolve, reject) => {
    
    const options = {
        hostname: 'financialmodelingprep.com',
        port: 443,
        path: `https://financialmodelingprep.com/api/v3/key-metrics/${individualTicker}?period=annual&apikey=0kHkERnKagO02ZDrjvySH3HnoybYheKv`,
        method: 'GET'
    }

        const req = https.request(options, (res) => {
            
            // Handle the response data
            res.on('data', (chunk) => {data.push(chunk)});
          
            // Handle the end of the response
            res.on('end', () => {resolve(data[0])})});
          
            // Handle any request errors
            req.on('error', (error) => {reject(`Request error: ${error.message}`)});
          
            // End the request
            req.end();
    });
}


    function searchRatios(individualTicker) {
        let data = [];
        return new Promise((resolve, reject) => {

        const options = {
            hostname: 'financialmodelingprep.com',
            port: 443,
            path: `https://financialmodelingprep.com/api/v3/ratios/${individualTicker}?period=annual&apikey=0kHkERnKagO02ZDrjvySH3HnoybYheKv`,
            method: 'GET'
        }

            const req = https.request(options, (res) => {
                
                // Handle the response data
                res.on('data', (chunk) => {data.push(chunk)});
                // Handle the end of the response
                res.on('end', () => {resolve(data[0])})});
            
            // Handle any request errors
                req.on('error', (error) => {reject(`Request error: ${error.message}`)});
            
            // End the request
                req.end();
            
        });
    }


    async function searchIndicators (individualTicker){
        
        const keyMetrics = await searchKeyMetrics(individualTicker)
        const ratios = await searchRatios(individualTicker)


        return [JSON.parse(keyMetrics), JSON.parse(ratios)]
    }

exports.searchNews = searchNews;
exports.searchIndicators = searchIndicators;
