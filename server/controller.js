// const fetch = require('node-fetch');
const { ListItem } = require('./mongoose.js');

const controller = {};

//======= GET LIST ========//
controller.getList = async (req, res, next) => {
  console.log('getList')
  try {
    await ListItem.find({})
      .then(data => {
        res.locals.list = data;
        next();
      })
  } catch (err) {
    return next({
      log: `An error occurred while getting list: ${err}`,
      message: { err: 'An error occurred in getList' },
    });
  }
};

//======= CREATE LIST ITEM ========//
controller.createListItem = async (req, res, next) => {
  console.log('createListItem', req.body)
  try {
    const {title} = req.body;
    await ListItem.create({
      title,
    })
    .then(data => {
      console.log('item created');
      next();
    })
  } catch(err) {
    return next({
      log: `An error occurred while adding list item: ${err}`,
      message: { err: 'An error occurred in createListItem' },
    });
  }
};

module.exports = controller;
