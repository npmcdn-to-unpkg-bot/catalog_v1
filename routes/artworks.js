var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
var controller = require('../controllers.js');

router.get('/catalog', ensureLoggedIn, function(req, res, next) {
  //console.log(controller.CATALOG());
  var catalog_info = controller.CATALOG();
  catalog_info["title"] = "CATALOG";
  res.render('artworks/catalog', catalog_info );
});

router.get('/artwork/:release_type/:which_work', ensureLoggedIn, function(req, res, next) {
  //console.log(req.params.which_work);
  var work_info = controller.ARTWORK(req.params.release_type,req.params.which_work);
  if(work_info.status=="success"){
    //console.log(work_info);
    res.render('artworks/artwork', work_info.payload);
  }
  else{
    var err = new Error('Non such artwork found');
    err.status = 404;
    next(err);
  }
});

module.exports = router;
