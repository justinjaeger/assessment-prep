var express = require('express');
var app = express();
var path = require('path');

console.log('this is server.js')

app.use(express.static(path.join(__dirname, '../' ))); //serves the index.html
app.listen(4000); //listens on port 4000 -> http://localhost:3000/