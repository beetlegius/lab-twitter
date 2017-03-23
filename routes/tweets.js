var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://beetlegius:beetlegius@ds139480.mlab.com:39480/twitter', ['tweets']);

var render = function(err, data) {
  if (err) { res.send(err); }
  res.json(data);
}

router.get('/tweets', function(req, res, next){
  db.tweets.find(function(err, data){
    if (err) { res.send(err); }
    res.json(data);
  });
});

router.get('/tweets/:id', function(req, res, next){
  db.tweets.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(err, data){
    if (err) { res.send(err); }
    res.json(data);
  });
});

router.post('/tweets', function(req, res, next){
  var tweet = req.body;
  if (!tweet.body || !tweet.username) {
    res.status(400);
    res.json({ "error": "Bad Data" });
  } else {
      db.tweets.save(tweet, function(err, data){
        if (err) { res.send(err); }
        res.json(data);
      });
  }
});

router.delete('/tweets/:id', function(req, res, next){
  db.tweets.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, data){
    if (err) { res.send(err); }
    res.json(data);
  });
});


router.delete('/tweets/:id', function(req, res, next){
  db.tweets.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, data){
    if (err) { res.send(err); }
    res.json(data);
  });
});


router.put('/tweets/:id', function(req, res, next){
  var tweet = req.body;
  var updTweet = {};

  if (tweet.body) {
    updTweet.body = tweet.body;
  }

  if (tweet.username) {
    updTweet.username = tweet.username;
  }

  if (!updTweet) {
    res.status(400);
    res.json({ "error": "Bad Data" });
  } else {
      db.tweets.update({ _id: mongojs.ObjectId(req.params.id) }, updTweet, {}, function(err, data){
        if (err) { res.send(err); }
        res.json(data);
      });
  }
});

module.exports = router;
