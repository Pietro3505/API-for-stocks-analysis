const express = require('express');
const app = express();
const results = require('./routes/results');

//Middleware
app.use(express.json());
app.use('/', results);

let port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port: ${port}`))