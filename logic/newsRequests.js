const {Ticker} = require('../models/tickerInfo');
const { SearchApi } = require('financial-news-api');
const searchApi = SearchApi('8e7351bacd5a46a58edd7baab64a24c0692e03c9eb684eb7a00f649b492e1461');


async function ask (ticker = new Ticker) {

    const query = {
        queryString: `symbols:${[ticker.tickers]} AND publishedAt:[${ticker.dateFrom} TO ${ticker.dateTo}]`,
        from: 0,
        size: 2,
      };

     
      return  await searchApi.getNews(query)
}


exports.ask = ask;