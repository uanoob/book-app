const mongoose = require('mongoose');
const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_I = 10;
const config = require('../config/config');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  name: {
    type: String,
    maxLength: 100,
  },
  lastname: {
    type: String,
    maxLength: 100,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
