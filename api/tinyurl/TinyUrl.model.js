const mongoose = require('mongoose');

module.exports = mongoose.model('tinyurl', new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: new Date().getTime()
  }
}));