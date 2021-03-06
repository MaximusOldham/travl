// Require resource's model(s).
var User = require("../models/user");

var index = function(req, res, next){
  User.find({}, function(error, users){
    res.json(users);
  });
};

var show = function(req, res, next){
  User.findById(req.params.id, function(error, user){
    if (error) res.json({message: 'Could not find user because ' + error});
    res.render('users/show', {user: user});
  });
};

var edit = function(req, res, next){

console.log('body', req.body);

  User.findById(req.body._id, function(error, user){
    if (error) res.json({message: 'Could not find user because ' + error});
    // user.set(req.body);
    user.save(function(err) {
      res.json(user);
    });
  });
};

var create = function(req, res, next){
  User.create(req.body, function(err, user) {
    if (err) res.json({message: 'Could not create user'});
      else res.json(user)
  })
}

var userShow = function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) res.send(err);

    // return the user
    res.json(user);
  })
}


module.exports = {
  index: index,
  show:  show,
  edit:  edit,
  create: create,
  userShow: userShow
};


