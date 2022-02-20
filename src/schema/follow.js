const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
  followerId: {
    type: String
  },
  followeeId: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Follow', followSchema);