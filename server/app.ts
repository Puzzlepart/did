require('dotenv').config();
import express from "express";
import favicon from 'express-favicon';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { isAuthenticated, isAdmin } from './middleware/passport';;
import * as middleware from './middleware';
const hbs = require('hbs');
const flash = require('connect-flash');
const createError = require('http-errors');

class App {
    private _instance: express.Application;

    constructor() {
        this._instance = express();
    }

    public setFavIcon(iconPath: string): App {
        this._instance.use(favicon(path.resolve(__dirname, iconPath)));
        return this;
    }

    public addErrorHandling(): App {
        this._instance.use(flash());
        this._instance.use((_req, _res, next) => {
            next(createError(404));
        });
        this._instance.use((error, req, res, _next) => {
            res.locals.error_header = 'We\'re sorry';
            res.locals.error_message = error.message;
            res.status(error.status || 500);
            res.render('error');
        });
        return this;
    }

    public addMiddleware(): App {
        this._instance.use(middleware.passport.initialize());
        this._instance.use(middleware.passport.session());
        this._instance.use(middleware.helmet);
        this._instance.use(middleware.session);
        return this;
    }

    public prepareStatic(): App {
        this._instance.use(logger('dev'));
        this._instance.use(express.json());
        this._instance.use(express.urlencoded({ extended: false }));
        this._instance.use(cookieParser());
        this._instance.use(express.static(path.resolve(__dirname, 'public')));
        return this;
    }

    public setViewEngine(engine: string, viewsPath: string): App {
        this._instance.set("view engine", engine);
        this._instance.set('views', viewsPath);
        hbs.registerPartials(path.resolve(viewsPath, 'partials'))
        return this;
    }

    // Prepare the / route to show a hello world page
    public mountHomeRoute(routePath: string): App {
        const router = express.Router();
        router.get('/', function (_req, res) {
            console.log('hello /');
            res.render('index', { active: { home: true } });
        });

        router.get('/timesheet', isAuthenticated, (req, res) => {
            res.render('timesheet', { active: { timesheet: true }, props: JSON.stringify(req.params) });
        });

        router.get('/customers', isAuthenticated, (req, res) => {
            res.render('customers', { active: { customers: true }, props: JSON.stringify(req.params) });
        });

        router.get('/projects', isAuthenticated, (req, res) => {
            res.render('projects', { active: { projects: true }, props: JSON.stringify(req.params) });
        });

        router.get('/reports', [isAuthenticated, isAdmin], (req, res) => {
            res.render('reports', { active: { reports: true }, props: JSON.stringify(req.params) });
        });

        router.get('/admin', [isAuthenticated, isAdmin], (req, res) => {
            res.render('admin', { active: { admin: true }, props: JSON.stringify(req.params) });
        });
        this._instance.use(routePath, router)
        return this;
    }

    // Prepare the /auth route
    public mountAuthRoute(routePath: string): App {
        const router = express.Router();
        router.get('/signin',
            (req, res, next) => {
                middleware.passport.authenticate('azuread-openidconnect',
                    {
                        prompt: process.env.OAUTH_SIGNIN_PROMPT,
                        failureRedirect: '/',
                    }
                )(req, res, next);
            },
        );

        router.post('/callback', (req: any, res: any, next: any) => {
            middleware.passport.authenticate('azuread-openidconnect',
                {
                    successRedirect: '/',
                    failureRedirect: '/',
                }
            )(req, res, next);
        });

        router.get('/signout', (req: any, res: any) => {
            req.session.destroy((_err: any) => {
                req.logout();
                res.redirect('/');
            });
        });
        this._instance.use(routePath, router)
        return this;
    }

    public setupApi(apiPath: string): App {
        this._instance.use(apiPath, isAuthenticated, middleware.graphql);
        return this;
    }

    public create() {
        return this._instance;
    }
}

export default new App()
    .addMiddleware()
    .mountHomeRoute('/')
    .mountAuthRoute('/auth')
    .setupApi('/graphql')
    .prepareStatic()
    .setViewEngine('hbs', path.resolve(__dirname, 'views'))
    .addErrorHandling()
    .setFavIcon('/public/images/favicon.ico')
    .create();