var express = require('express');
var router = express.Router();
var Relationship = require('../models/relationship.js');

router.get('/users/:user_id/relationships', function(req, res, next){
  Relationship.find({ userFromId: req.params.user_id }, function(err, data){
    if (err) {
      res.send(err).status(400);
    } else {
      res.json(data).status(200);
    }
  });
});

router.post('/relationships', function(req, res, next){
  var relationship = new Relationship(req.body);
  relationship.save(function(err, resource) {
    if (err) {
      res.send(err).status(400);
    } else {
      res.json(resource).status(201);
    }
  });
});

router.delete('/relationships/:id', function(req, res, next){
  Relationship.remove({ _id: req.params.id }, function(err, data){
    if (err) {
      res.send(err).status(400);
    } else {
      res.json(data).status(200);
    }
  });
});

module.exports = router;
