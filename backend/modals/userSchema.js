const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [
    {
      title: String,
      description: String,
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;