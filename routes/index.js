var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Message = require('../models/message');

/* Connect to MongoDB */
mongoose
  .connect('mongodb+srv://canosantiago404:Klt9eVvhlCP2nFQZ@cluster0.fstf54n.mongodb.net/mini-message-board?retryWrites=true&w=majority')
  .then((x) =>
    console.log(`Connected the Database: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error('Error conectando a mongoDB', err));

/* GET home page. */
router.get('/', async function(req, res, next) {
  await Message.find().then((messages) => {
    res.render('index', { title: "Mini Messageboard", messages: messages });
  });
});

/* GET new message page. */
router.get('/new', (req, res) => {
  res.render('form', {title: "Mini Messageboard"});
});

/* POST new message */
router.post('/new', async (req, res) => {
  const reqBody = req.body;
  const m = new Message({
    user: reqBody.userName,
    text: reqBody.userMessage,
    added: new Date(),
  });
  await m.save().then(() => console.log('Mensaje guardado'));
  res.redirect('/');
});

module.exports = router;