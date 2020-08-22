var express = require('express');
var app = express();
var path = require('path');
const controller = require('./controller');
console.log('this is server.js')

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static / index.html
app.use(express.static(path.join(__dirname, '../' ))); //serves the index.html

// Respond with main app
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))
});


// ========= MAIN REQUESTS ========= //
// Get request to DB
app.get('/db', controller.getList, (req,res) => {
  console.log('finished get request');
  res.status(200).json(res.locals.list);
});
// Post request to DB
app.post('/db', controller.createListItem, (req,res) => {
  console.log('finished post request');
  res.send('finished creating list item');
});
// ================================= //

app.listen(4000); //listens on port 4000 -> http://localhost:4000/