require('express-async-errors');
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const winston = require('winston');
require('winston-mongodb');
const errors = require('./middleware/errors');
const results = require('./routes/resultsRouter');
const visualization = require('./routes/visualization');
const password = process.env.API_PASSWORD
const uri = `mongodb+srv://pietro741:${password}@cluster0.pw8ukip.mongodb.net/?retryWrites=true&w=majority`;


//Error Handling
const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({filename: './loggers/logger.log'}),
      new winston.transports.MongoDB({db: uri}),
      new winston.transports.File({filename: './loggers/exceptions.log', handleExceptions: true}),
      new winston.transports.File({ filename: './loggers/rejections.log' })
    ]
  });

//DB
mongoose.connect(uri, {useUnifiedTopology: true })
    .then( () => {console.log('Connected to MongoDB')} )
    .catch(err => console.log(err));

//Middleware
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use('/api/results', results);
app.use('/api/visualize', visualization);
app.use(errors)



let port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port: ${port}`))
