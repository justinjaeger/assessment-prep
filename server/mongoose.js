const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ==================== //
// === MONGO CONFIG === //
// ==================== //

const MONGO_URI =
'mongodb+srv://justinjaeger:ratinthehat@cluster0.jznd2.mongodb.net/Cluster0?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Cluster0', // sets the name of the DB that our collections are part of
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

// =============== //
// === SCHEMAS === //
// =============== //

/*
  Template for generating list items
*/

const listItem = new Schema({
  title: String
});

const ListItem = mongoose.model('listItem', listItem); // declare after every new schema

// ==================== //

module.exports = { ListItem } // export schemas