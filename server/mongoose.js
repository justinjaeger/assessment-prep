const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MONGO_URI =
  'mongodb+srv://justinjaeger:ratinthehat@cluster0.jznd2.mongodb.net/Cluster0?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'Cluster0',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

// sets a schema for the 'species' collection
const listItem = new Schema({
  title: String
});

const ListItem = mongoose.model('listItem', listItem)

// creats a model for the and exports it
module.exports = {ListItem}