const winston = require('winston');
const express = require('express');
const app = express();

module.exports = app.use(function(err, req, res, next) {
    winston.error(err.message, err)
        // Log the exception and return a friendly error to the client.  
        res.status(500).send('Something failed');

    });