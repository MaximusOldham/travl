var User = require('../models/user');

var token = function(req, res, next) {
  User.find({email: req.body.email})
}
