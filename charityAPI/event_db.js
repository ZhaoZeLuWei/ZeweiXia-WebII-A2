//import db_details
var event_db = require("./db_details.js");

//import modules (npm install)
var mysql = require('mysql2');
var bodyParser = require('body-parser');
var http = require('http');

//getConnection() that returns the createConnection() from mysql2
//provide an object which contains the details of the database
module.exports = {
    getConnection: function() {
        return mysql.createConnection({
            host: event_db.host,
            port: event_db.port,
            user: event_db.user,
            password: event_db.password,
            database: event_db.database,
            dateStrings: true,
        })
    }
}
