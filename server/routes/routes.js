var express = require('express'),
    router  = new express.Router();

// Require controllers.
var welcomeController = require('../controllers/welcome');
var usersController   = require('../controllers/users');
var authController    = require('../controllers/auth');
// root path:
router.get('/', welcomeController.index);

// users resource paths:
router.get('/users',     usersController.index);
router.get('/users/:id', usersController.show);

// post
router.post('/users',     usersController.create);
router.post('/token',     authController.token);

module.exports = router;
