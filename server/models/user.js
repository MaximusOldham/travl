var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

mongoose.Promise = Promise;

var userSchema = new mongoose.Schema({
  name:   String,
  email: String,
  password: String,
  ppUrl: String,
  locations: [pointSchema]
});

var pointSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  lat: Number,
  lon: Number
})

userSchema.plugin(require('mongoose-bcrypt'));


var User = mongoose.model('User', userSchema);

module.exports = User;
