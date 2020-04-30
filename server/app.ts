require('dotenv').config();
import express from 'express';
import favicon from 'express-favicon';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { isAuthenticated } from './middleware/passport';
import * as middleware from './middleware';

const app: express.Application = express();

app.use(middleware.helmet);
app.use(favicon(__dirname + '/public/images/favicon.ico'));

//#region Setting up session using connect-azuretables
app.use(middleware.session);
//#endregion

//#region HBS views setup
import hbs from 'hbs';
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
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
//#endregion

//#region Storing user for hbs
app.use((req: any, res, next) => {
    if (req.user && req.user.data) {
        res.locals.user = {
            ...req.user.profile,
            role: req.user.data.role,
            isAdmin: req.user.data.role === 'Admin',
        };
    }
    res.locals.package = require('../package.json');
});
//#endregion

//#region Routes/middleware
import * as routes from './routes';
app.use('/', routes.root);
app.use('/auth', routes.auth);
app.use('/graphql', isAuthenticated, middleware.graphql);
//#endregion

//#region Error handling
import createError from 'http-errors';

app.use((_req, _res, next) => {
    next(createError(404));
});

app.use((error: any, req: any, res: any, _next: any) => {
    res.locals.error_header = 'We\'re sorry';
    res.locals.error_message = error.message;
    res.status(error.status || 500);
    res.render('error');
});
//#endregion

if (process.env.NODE_ENV === 'development') require('./middleware/webpack-dev')(app);

export default app;
