//import all methods
var dbConnection = require('../event_db');
var express = require('express');

//create the connection with the database
var connection = dbConnection.getConnection();

//open up connection
connection.connect();

//API routes below
var router = express.Router();

//GET: home page, only show brief information, not all
router.get('/events', function (req, res) {
    q = ` SELECT
        e.EventID,
        e.EventName, 
        e.EventDate, 
        c.CategoryName, 
        o.OrgName,
        l.LocationName,
        e.ImageURL
      FROM Event e
      JOIN Category c ON e.CategoryID = c.CategoryID
      JOIN Organisation o ON e.OrgID = o.OrgID
      JOIN Location l ON l.LocationID = o.LocationID
      ORDER BY e.EventDate ASC
    `;
    connection.query(q, function(err, records,rows) {
        if (err) {
            console.error(err);
        }
        else{
            //为了安全考虑，是否只返回首页需要的关键要素（名称，时间，类型，其余细节不send）
            res.send(records);
        }
    })
})

//GET: url into the specific event id, then send all information about that event
router.get('/events/:id', function (req, res) {
 q = `
 SELECT 
            e.EventID, 
            e.EventName, 
            e.EventDate, 
            e.Description, 
            e.ImageURL,
            e.LocationDetails,
            l.LocationName,
            c.CategoryName
        FROM Event e
        JOIN Location l ON e.LocationID = l.LocationID
        JOIN Category c ON e.CategoryID = c.CategoryID
        WHERE e.EventID = ?
 `;
 connection.query(q, function(err, records,rows) {

     if (err) {
         console.error(err);
     }
     else{
         res.send(records);
     }
 })
})

//Get specific date

//Get specific category

//Get specific location

//Get specific Name


//Export API routers
module.exports = router;