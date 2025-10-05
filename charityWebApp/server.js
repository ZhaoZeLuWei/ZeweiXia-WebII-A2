//import modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

//to parse URL-encoded & JSON data
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//to serve static files
app.use(express.static(__dirname));

//route to index.html (home page)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/:id', (req, res) => {
    res.sendFile(path.join(__dirname, './html/eventInfo.html'));
})

app.listen(8080, ()=> {
    console.log('Server started on port 8080');
});