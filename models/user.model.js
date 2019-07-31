const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  regDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
