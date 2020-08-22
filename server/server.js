var express = require('express');
var app = express();
var path = require('path');

// ======= LOAD CONTROLLERS ======= //

const controller = require('./controller');

// =================================== //
// === HANDLE PARSING REQUEST BODY === //
// =================================== //

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================================== //
// === SERVE STATIC FILES // INDEX.HTML === //
// ======================================== //

app.use(express.static(path.join(__dirname, '../' )));

// ================ //
// === REQUESTS === //
// ================ //

/*
  GET request for loading the entire list
*/

app.get('/db', 
  controller.getList,
  (req,res) => res.status(200).json(res.locals.list)
);

/*
  POST request for creating a new item in the database
*/

app.post('/db', 
  controller.createListItem, 
  (req,res) => res.send('Created list item')
);

// ======= LISTEN ======= //

app.listen(4000); // listens on port 4000 -> http://localhost:4000/