// Import Package
const express = require('express');
const morgan = require('morgan');
const moviesRouter = require('./Routes/moviesRoutes.js');

let app = express();

const logger = function(req, res, next){
    console.log("Custom middleware called");
    next();
}

app.use(express.json());
app.use(morgan('dev'));
app.use(logger);
app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
})

//USING ROUTES
app.use('/api/v1/movies', moviesRouter);

module.exports = app;
