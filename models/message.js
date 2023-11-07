const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  added: { type: Date, required: true },
});

module.exports = mongoose.model('messages', messageSchema);