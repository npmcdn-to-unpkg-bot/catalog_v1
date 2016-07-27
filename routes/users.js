var express = require('express');
var router = express.Router();
var controller = require('../controllers.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user', { title: 'User-NAME' });
});

module.exports = router;
