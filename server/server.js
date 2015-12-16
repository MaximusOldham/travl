var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var bodyParser   = require('body-parser');
var debug        = require('debug')('app:http');
var cookieParser = require('cookie-parser');
var cors         = require('cors');

// Load local libraries.
var env      = require('./config/environment'),
    mongoose = require('./config/database'),
    routes   = require('./routes/routes');

// Instantiate a server application.
var app = express();

// Configure the application (and set it's title!).
app.set('title', env.TITLE);
app.set('safe-title', env.SAFE_TITLE);
// EJS view engine config
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('secret-key', env.SECRET_KEY);

// Create local variables for use thoughout the application.
app.locals.title = app.get('title');

// Logging layer.
app.use(logger('dev'));
app.use(cors());
// Helper layer (parses the requests, and adds further data).
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser('notsosecretnowareyou'));

// Routing layers: favicon, static assets, dynamic routes, or 404…

// Routes to static assets. Uncomment below if you have a favicon.
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// *** API ROUTES ***
app.use(debugReq);

// Root path: returns a list of possible requests.
app.get('/api', function(req, res, next) {
  var baseUri = `${req.protocol}:\/\/${req.get('host')}\/api`;
  res.json({
    token_url: `${baseUri}/token`,
    user_urls: [
      `${baseUri}/users`,
      `${baseUri}/me`
    ]
  });
});

// Validation: check for correctly formed requests (content type).
app.use(['/api/users', '/api/token'], function(req, res, next) {
  if (req.get('Content-Type') !== 'application/json') {
    errorHandler(
      400,
      'Request body must be JSON. Set your headers; see ' +
      'http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17',
      req, res
    );
  } else {
    next();
  }
});

// Parsing and validation (replies with good errors for JSON parsing).
app.use('/api', bodyParser.json());

// User resource route (POST /users)
require('./routes/userRoute')(app, errorHandler);

// Token resource route (POST /token)
require('./routes/tokenRoute')(app, errorHandler);

// Authorized resource route (GET /me)
require('./routes/meRoute')(app, errorHandler);

// *** ERROR ROUTES ***

// Catches all 404 routes, either for non-existing routes
// or routes that have passed to it.
app.use(function(req, res) {
  errorHandler(404, '', req, res)
});

// Error-handling layer.
app.use(function(err, req, res, next) {
  // In development, the error handler will print stacktrace.
  err = (app.get('env') === 'development') ? err : {};
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

function debugReq(req, res, next) {
  debug('params:', req.params);
  debug('query:',  req.query);
  debug('body:',   req.body);
  next();
}

function errorHandler(code, message, req, res) {
  var title = '';
  var responseJson = {};

  res.status(code);
  switch(code) {
    case 400: title = '400 Bad Request';  break;
    case 401: title = '401 Unauthorized'; break;
    case 403: title = '403 Forbidden';    break;
    case 404: title = '404 Not Found';    break;
    case 422: title = '422 Unprocessable Entity';
  }

  responseJson.response = title;
  if (message && message.length > 0) responseJson.message = message;

  res.json(responseJson);
}

module.exports = app;
