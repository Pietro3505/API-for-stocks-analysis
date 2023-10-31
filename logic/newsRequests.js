const {Ticker} = require('../models/tickerInfo');
const { SearchApi } = require('financial-news-api');
const searchApi = SearchApi('8e7351bacd5a46a58edd7baab64a24c0692e03c9eb684eb7a00f649b492e1461');
//const request = require('request');


async function ask (ticker = new Ticker) {

    const query = {
        queryString: `symbols:${[ticker.tickers]} AND publishedAt:[${ticker.dateFrom} TO ${ticker.dateTo}]`,
        from: 0,
        size: 10,
      };

    
     
      return  await searchApi.getNews(query)
}


exports.ask = ask;
 // var url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${Ticker.tickers}}&apikey=TGXVRBQMBJAVOD8L`;

    // request.get({
    // url: url,
    // json: true,
    // headers: {'User-Agent': 'request'}
    // }, (err, res, data) => {
    // if (err) {
    //   console.log('Error:', err);
    // } else if (res.statusCode !== 200) {
    //   console.log('Status:', res.statusCode);
    // } else {
    //   // data is successfully parsed as a JSON object:
    //   console.log(data);
    // }
    // });