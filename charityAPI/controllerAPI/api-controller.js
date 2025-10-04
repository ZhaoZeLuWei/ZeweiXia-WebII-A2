//import all methods
var dbConnection = require('../event_db');
var express = require('express');

//create the connection with the database
var connection = dbConnection.getConnection();

//open up connection
connection.connect();

//API routes below
var router = express.Router();

//GET (all elements from Event table)
router.get('/', function (req, res) {
    connection.query('SELECT * FROM Event', function(err, records,rows) {
        if (err) {
            console.error(err);
        }
        else{
            res.send(records);
        }
    })
})

//Export API routers
module.exports = router;