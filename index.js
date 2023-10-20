const express = require('express');
const app = express();
const mongoose = require('mongoose')
const results = require('./routes/resultsRouter');
const password = process.env.API_PASSWORD
const uri = `mongodb+srv://pietro741:${password}@cluster0.pw8ukip.mongodb.net/?retryWrites=true&w=majority`;




const tickerSchema = new mongoose.Schema({
    tickers: [String], 
    dateFrom: {type: Date, default: Date.now},
    dateTo: {type: Date, default: Date.now}
})

const TickerSend = mongoose.model("TickerSend", tickerSchema);
const tickerSend = new TickerSend({   
    tickers: [
    "NVDA",
    "APPL"
    ], 
dateFrom: "2023-10-11",
dateTo: "2023-10-12"   
})

//Middleware
app.use(express.json());
app.use('/', results);


async function main() {
  await mongoose.connect(uri);

}

main()
.then( () => {tickerSend.save();} )
.catch(err => console.log(err));




let port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port: ${port}`))




