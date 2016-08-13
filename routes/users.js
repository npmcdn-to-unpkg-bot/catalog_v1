var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
var controller = require('../controllers.js');

/* GET users listing. */
router.get('/', ensureLoggedIn, function(req, res, next) {
  res.render('user', { title: req.user });
});

module.exports = router;
