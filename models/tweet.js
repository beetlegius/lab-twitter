var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TweetSchema = new Schema({
  userId: String,
  username: String,
  body: String
});

var Tweet = mongoose.model('Tweet', TweetSchema);

module.exports = Tweet;
