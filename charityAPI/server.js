//import all required modules
var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');

//import RESTFul API
var charityAPI = require('./controllerAPI/api-controller');

//Create the server with methods imported
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//use() to match the URL and API
//go to localhost:3060/api -> charityAPI = api-controller.js run
app.use('/api', charityAPI);

//run server on the port 3060
app.listen(3060);
console.log('Server is running on port 3060');

//no need page icon
app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

