require('dotenv').config();
const _ = require('underscore');
const log = require('debug')('app');
const createError = require('http-errors');
const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const passport = require('./middleware/passport');
const isAuthenticated = require('./middleware/passport/isAuthenticated');
const hbs = require('hbs');
const app = express();

app.use((req, res, next) => {
  const host = req.get('host');
  if (host.indexOf('localhost') !== -1 && process.env.AZURE_STORAGE_CONNECTION_STRING.indexOf('dev') === -1) {
    res.render('error', {
      error_header: 'Development error',
      error_message: `Running the server on ${host} requires usage of dev storage.`,
    });
  }
  next();
});

app.use(require('./middleware/helmet'));
app.use(favicon(__dirname + '/public/images/favicon/favicon.ico'));

//#region Setting up session using connect-azuretables
app.use(require('./middleware/session'));
//#endregion

//#region Flash
app.use(flash());
//#endregion

//#region HBS views setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'))
//#endregion

//#region API setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//#endregion

//#region Passport
app.use(passport.initialize());
app.use(passport.session());
//#endregion

//#region Routes/middleware
app.use('/auth', require('./routes/auth'));
app.use('/graphql', isAuthenticated, require('./middleware/graphql'));
app.use('*', require('./routes/index'));
//#endregion

//#region Error handling
app.use((_req, _res, next) => {
  next(createError(404));
});

app.use((error, req, res, _next) => {
  res.locals.error_header = 'We\'re sorry';
  res.locals.error_message = error.message;
  res.status(error.status || 500);
  res.render('error');
});
//#endregion

module.exports = app;
