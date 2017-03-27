var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RelationshipSchema = new Schema({
  userFromId: String,
  userToId: String
});

var Relationship = mongoose.model('Relationship', RelationshipSchema);

module.exports = Relationship;
