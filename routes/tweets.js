var express = require('express');
var router = express.Router();
var Tweet = require('../models/tweet.js');

router.get('/tweets', function(req, res, next){
  Tweet.find({}, function(err, data){
    if (err) {
      res.send(err).status(400);
    } else {
      res.json(data).status(200);
    }
  });
});

router.get('/tweets/:id', function(req, res, next){
  Tweet.findById(req.params.id, function(err, data){
    if (err) {
      res.send(err).status(400);
    } else {
      res.json(data).status(200);
    }
  });
});

router.post('/tweets', function(req, res, next){
  var tweet = new Tweet(req.body);
  tweet.save(function(err, resource) {
    if (err) {
      res.send(err).status(400);
    } else {
      res.json(resource).status(201);
    }
  });
});

router.delete('/tweets/:id', function(req, res, next){
  Tweet.remove({ _id: req.params.id }, function(err, data){
    if (err) {
      res.send(err).status(400);
    } else {
      res.json(data).status(200);
    }
  });
});

router.put('/tweets/:id', function(req, res, next){
  Tweet.update({ _id: req.params.id }, { $set: req.body }, function(err, data){
    if (err) {
      res.send(err).status(400);
    } else {
      res.json(data).status(200);
    }
  });
});

module.exports = router;
