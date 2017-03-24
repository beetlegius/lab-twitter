var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://beetlegius:beetlegius@ds139480.mlab.com:39480/twitter', ['relationships']);

router.get('/users/:user_id/relationships', function(req, res, next){
  db.relationships.find({ userFromId: req.params.user_id }, function(err, data){
    if (err) { res.send(err); }
    res.json(data);
  });
});

router.post('/relationships', function(req, res, next){
  var relationship = req.body;
  if (!relationship.userFromId || !relationship.userToId) {
    res.status(400);
    res.json({ "error": "Bad Data" });
  } else {
      db.relationships.save(relationship, function(err, data){
        if (err) { res.send(err); }
        console.log('relationship created...');
        res.json(data);
      });
  }
});

router.delete('/relationships/:id', function(req, res, next){
  db.relationships.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, data){
    if (err) { res.send(err); }
    res.json(data);
  });
});

module.exports = router;
