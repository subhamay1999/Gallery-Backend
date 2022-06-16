const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  tokens: [{ type: Object }]
});

module.exports = mongoose.model('User', userSchema);