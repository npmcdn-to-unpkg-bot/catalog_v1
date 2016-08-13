var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var nunjucks = require('nunjucks');
var expressValidator = require('express-validator');
var rollbar = require('rollbar');


dotenv.load();

var routes = require('./routes/index');
var users = require('./routes/users');
var artworks = require('./routes/artworks');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('templates', path.join(__dirname, 'views/templates'));
app.set('partials', path.join(__dirname, 'views/partials'));

var nunjucks_env = nunjucks.configure('views', {
  autoescape: true,
  express   : app,
  watch: true
});

app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.ROLLBAR_TOKEN) {
  rollbar.init(process.env.ROLLBAR_TOKEN, { environment: process.env.MODE });
}

app.use('/', routes);
app.use('/users', users);
app.use('/artworks', artworks);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    rollbar.handleError(err);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  rollbar.handleError(err);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
