const {Ticker} = require('../models/tickerInfo');
const { SearchApi } = require('financial-news-api');
const searchApi = SearchApi('8e7351bacd5a46a58edd7baab64a24c0692e03c9eb684eb7a00f649b492e1461');



const query = {
  queryString: `symbols:${['NVDA','NVGO', 'TSLA']} AND publishedAt:[2021-03-01 TO 2021-05-20]`,
  from: 0,
  size: 10,
};

function ask (Ticker) {
    searchApi.getNews(query)
    .then((articles) => console.log(articles))
    .catch((ex) =>  {console.log(ex)});
}


exports.ask = ask;