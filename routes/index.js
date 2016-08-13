var express = require('express');
var sanitizer = require('sanitizer');
//var util = require('util');
var expressValidator = require('express-validator');
var MongoClient = require('mongodb').MongoClient;
var dateTime = require('date-time');

var mailer = require('../services/mailer');

var router = express.Router();


var env_params = {};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'INFINITE.INDUSTRIES: Welcome' });
});

//----------------------------------
router.get('/signup',
  function(req, res){
    res.render('signup',{ title: 'INFINITE.INDUSTRIES: SignUp' });
  });

//yuck! this is so getting refactored
router.post('/request-account',
  function(req, res, next){

    //validate the params
    req.checkBody("user_name", "Please enter a valid name.").isLength({min:1,max:50});
    req.checkBody("user_email", "Please enter a valid email address.").isEmail();
    req.checkBody("referral_source", "Please enter a valid referral source.").optional().isLength({min:1,max:600});

    var errors = req.validationErrors();
    //redirect to confirmation page or kick out an error
    if (errors) {
      res.json({"status":"failure","redirect_to":'failed-signup'});

      //need actual error logging here
      console.log("encountered problems: "+errors[0].msg);
      return;
    } else {
      //sanitize the submitted params, send reminder to admin
      //and push info about the user to a database
      console.log(req.body);

      var name = sanitizer.sanitize(req.body.user_name);
      var email = req.body.user_email;
      var referral_source = sanitizer.sanitize(req.body.referral_source);
      //some basic injection protection need to learn more about this topic
      referral_source = referral_source.replace("$","DOLLAR_SIGN");

      // //email reminder to admin
      var text_to_email = name + " at "+ email+" requests an invite.\n Referral source is: "+ referral_source;
      if(req.body.email_signup){
        text_to_email=text_to_email + "\n This user needs to be added to the email list\n";
      }
      var account_request = {
        'subject':'Requesting an Account Invite',
        'text':text_to_email,
        'contact_email': email,
        'add_to_mailist': req.body.email_signup
      };
      mailer.sendAdminEmail(account_request);

      // rollbar.reportMessage("Hello, Dima!");
      // //log to database
      MongoClient.connect(process.env.LINK_TO_MONGO, function(err, database){
        if (err){
          // console.log(err);
          next(err);
        }
        else{
          account_request.subject=account_request.subject+" on: "+dateTime();
          db = database;
          db.collection('account_requests').save(account_request, function(err, result){
            if (err){
              console.log(err);
              next(err);
            }
            else{
              //console.log('saved to database');
              res.json({"status":"success","redirect_to":'confirmed-signup'});
            }
          })

        }
      })
    }
});

router.get('/confirmed-signup',
  function(req, res){
    res.render('confirmed-signup',{ title: 'INFINITE.INDUSTRIES: Thank you!' });
  });

router.get('/failed-signup',
  function(req, res){
    res.render('failed-signup',{ title: 'INFINITE.INDUSTRIES: Hmmmmm, something went wrong :(' });
  });
//----------------------------------
router.get('/login',
  function(req, res){
    res.render('login', { env_params: env_params });
  });

router.get('/logout',
  function(req, res){
    //req.logout();
    res.redirect('/');
  });

router.get('/login-error',
  function(req, res){
    res.render('login-error',{ title: 'INFINITE.INDUSTRIES: Hmmmmm, something went wrong :(' });
  });

module.exports = router;
