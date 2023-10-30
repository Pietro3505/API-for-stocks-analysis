const express = require('express');
const app = express();
const mongoose = require('mongoose')
const results = require('./routes/resultsRouter');
const password = process.env.API_PASSWORD
const uri = `mongodb+srv://pietro741:${password}@cluster0.pw8ukip.mongodb.net/?retryWrites=true&w=majority`;
const {chatGPTCompletion} = require('./logic/openAi');

mongoose.connect(uri)
.then( () => {console.log('Connected to MongoDB')} )
.catch(err => console.log(err));

//Middleware
app.use(express.json());
app.use('/api/', results);




let port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port: ${port}`))
