require('dotenv').config();
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

app.use(require('./middleware/helmet'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

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

//#region Storing user for hbs
app.use((req, res, next) => {
  if (req.user && req.user.data) {
    res.locals.user = {
      ...req.user.profile,
      role: req.user.data.role,
      isAdmin: req.user.data.role === 'Admin',
    };
  }
  next();
});
//#endregion

//#region Routes/middleware
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/graphql', isAuthenticated, require('./middleware/graphql'));
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
