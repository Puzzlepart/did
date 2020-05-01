require('dotenv').config();
import cookieParser from 'cookie-parser';
import express from "express";
import favicon from 'express-favicon';
import logger from 'morgan';
import path from 'path';
import graphql from './controllers/graphql';
import * as middleware from './middleware';
import * as config from './config';
import passport from 'passport';
const hbs = require('hbs');
const flash = require('connect-flash');
const createError = require('http-errors');

class App {
    constructor(private _instance: express.Application) { }

    public setFavIcon(iconPath: string): App {
        this._instance.use(favicon(path.resolve(__dirname, iconPath)));
        return new App(this._instance);
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
        this._instance.use(middleware.helmet);
        this._instance.use(middleware.session);
        this._instance.use(config.passport.initialize());
        this._instance.use(config.passport.session());
        return this;
    }

    public config() {
        this._instance.use(logger('dev'));
        this._instance.use(express.json());
        this._instance.use(express.urlencoded({ extended: false }));
        this._instance.use(cookieParser());
        return this;
    }

    public prepareStatic(): App {
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
        router.get('/', function (_req, res) { res.render('index', { active: { home: true } }); });

        router.get('/timesheet', config.isAuthenticated, (req, res) => {
            res.render('timesheet', { active: { timesheet: true }, props: JSON.stringify(req.params) });
        });

        router.get('/customers', config.isAuthenticated, (req, res) => {
            res.render('customers', { active: { customers: true }, props: JSON.stringify(req.params) });
        });

        router.get('/projects', config.isAuthenticated, (req, res) => {
            res.render('projects', { active: { projects: true }, props: JSON.stringify(req.params) });
        });

        router.get('/reports', [config.isAuthenticated, config.isAdmin], (req, res) => {
            res.render('reports', { active: { reports: true }, props: JSON.stringify(req.params) });
        });

        router.get('/admin', [config.isAuthenticated, config.isAdmin], (req, res) => {
            res.render('admin', { active: { admin: true }, props: JSON.stringify(req.params) });
        });
        this._instance.use(routePath, router);
        return this;
    }

    public mountAuthRoute(routePath: string): App {
        const router = express.Router();
        router.get('/signin',
            (req, res, next) => {
                passport.authenticate('azuread-openidconnect',
                    {
                        response: res,
                        prompt: process.env.OAUTH_SIGNIN_PROMPT,
                        failureRedirect: '/',
                    } as any
                )(req, res, next);
            },
        );

        router.post('/callback', (req: any, res: any, next: any) => {
            passport.authenticate('azuread-openidconnect',
                {
                    response: res,
                    successRedirect: '/',
                    failureRedirect: '/',
                } as any
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

    public setupControllers(apiPath: string): App {
        this._instance.use(apiPath, config.isAuthenticated, graphql);
        return this;
    }

    public setUpWebpackDevMiddleware(isDev: boolean): App {
        if (isDev) middleware.webpackDev(this._instance);
        return this;
    }

    public create() {
        return this._instance;
    }
}

export default new App(express())
    .config()
    .addMiddleware()
    .mountHomeRoute('/')
    .mountAuthRoute('/auth')
    .setupControllers('/graphql')
    .prepareStatic()
    .setViewEngine('hbs', path.resolve(__dirname, 'views'))
    .addErrorHandling()
    .setFavIcon('/public/images/favicon.ico')
    .setUpWebpackDevMiddleware(false)
    .create();