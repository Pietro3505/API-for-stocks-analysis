const express = require('express');
const app = express();
const results = require('./routes/resultsRouter');
const { MongoClient, ServerApiVersion } = require('mongodb');
const password = process.env.API_PASSWORD
const uri = `mongodb+srv://pietro741:${password}@cluster0.pw8ukip.mongodb.net/?retryWrites=true&w=majority`;
const mongoose = require('mongoose')


main()
.then( () => {tickerSend.save();} )
.catch(err => console.log(err));

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


async function main() {
  await mongoose.connect(uri);

}



//Middleware
app.use(express.json());
app.use('/', results);

let port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port: ${port}`))







// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });





// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run()
// .then(() => { 

// }
// )
// .catch(err => console.log(err));


// const doc = { 
//     tickers: [
//         "NVDA",
//         "APPL"
//     ], 
//     dateFrom: "2023-10-11",
//     dateTo: "2023-10-12"
// };
// const myDB = client.db("tickerCalls");
// const myColl = myDB.collection("Test");
// const result = myColl.insertOne(doc);
// console.log(`A document was inserted with the _id: ${result.insertedId}`,);