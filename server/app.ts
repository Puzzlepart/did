require('dotenv').config();
import cookieParser from 'cookie-parser';
import express from "express";
import favicon from 'express-favicon';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { resolve as resolvePath } from 'path';
import graphql from './controllers/graphql';
import * as middleware from './middleware';
import * as config from './config';
import passport from 'passport';
import _ from 'underscore';
const hbs = require('hbs');
const flash = require('connect-flash');
const createError = require('http-errors');
const debug = require('debug')('app');

enum ROUTE_PROTECTION {
    NONE,
    AUTHENTICATED,
    ADMIN
}

class App {
    constructor(private _instance: express.Application) {
        this._instance.use(flash());
        this._config();
        this._addMiddleware();
        this._mountHomeRoute('/');
        this._mountAuthRoute('/auth');
        this._setupControllers('/graphql');
        this._prepareStatic();
        this._setViewEngine('hbs', resolvePath(__dirname, 'views'));
        this._addErrorHandling();
        this._setFavIcon('/public/images/favicon.ico');
        this._setUpWebpackDevMiddleware(process.env.NODE_ENV === 'development');
    }

    public _setFavIcon(iconPath: string) {
        debug('Setting favicon to %s...', iconPath);
        this._instance.use(favicon(resolvePath(__dirname, iconPath)));
    }

    public _addErrorHandling() {
        debug('Adding error handling...');
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
    }

    public _addMiddleware() {
        debug('Adding middleware...');
        this._instance.use(middleware.helmet);
        this._instance.use(middleware.session);
        this._instance.use(config.passport.initialize());
        this._instance.use(config.passport.session());
    }

    public _config() {
        debug('Configuring logger, express.json, bodyParser and cookingParser...');
        this._instance.use(logger('dev'));
        this._instance.use(express.json());
        this._instance.use(bodyParser.urlencoded({ extended: true }));
        this._instance.use(cookieParser());
    }

    public _prepareStatic() {
        debug('Preparing static...');
        this._instance.use(express.static(resolvePath(__dirname, 'public')));
    }

    public _setViewEngine(engine: string, viewsPath: string) {
        debug('Preparing view engine to %s with view path %s...', engine, viewsPath);
        this._instance.set("view engine", engine);
        this._instance.set('views', viewsPath);
        hbs.registerPartials(resolvePath(viewsPath, 'partials'))
    }

    /**
     * Get user from request
     * 
     * @param {any} req Request 
     */
    private _getUser(req: any) {
        if (req.user && req.user.data) {
            return _.omit({
                ...req.user['profile'],
                ...req.user['data'],
                isAdmin: req.user.data.role === 'Admin',
            }, '_raw', '_json', 'name');
        }
        return null;
    }

    /**
     * Authenticates the route
     * 
     * @param {any} req Request
     * @param {any} res Response
     * @param {express.NextFunction} next Next function
     */
    private _authRoute(req: any, res: any, next: express.NextFunction) {
        const route = req.originalUrl.substring(1) || 'home';
        if (route !== 'home' && !req.isAuthenticated()) res.redirect('/');
        if (route != 'graphql') {
            const user = this._getUser(req);
            res['locals']['user'] = user;
            res['locals']['props'] = JSON.stringify(req.params);
            res['locals']['active'] = { [route]: true };
        }
        next();
    }

    /**
     * Mount home routes on {routePath}
     * 
     * @param routePath 
     */
    public _mountHomeRoute(routePath: string) {
        debug('Mounting home route...');
        const router = express.Router();
        const authRoutes = ['timesheet', 'customers', 'projects', 'reports', 'admin'];

        /**
         * Home route
         */
        router.get(
            '/',
            this._authRoute.bind(this),
            (_req: any, res: any) => {
                res.render('index');
            });

        /**
         * Routes requiring authentication
         */
        for (let i = 0; i < authRoutes.length; i++) {
            const route = authRoutes[i];
            router.get(`/${route}`, this._authRoute.bind(this), (_req: any, res: any) => res.render(route));
        }

        this._instance.use(routePath, router);
    }

    /**
     * Mount auth routes on {routePath}
     * 
     * @param routePath 
     */
    public _mountAuthRoute(routePath: string) {
        debug('Mounting auth route...');
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
    }

    public _setupControllers(apiPath: string) {
        debug('Setting up controllers...');
        this._instance.use(apiPath, this._authRoute.bind(this), graphql);
    }

    public _setUpWebpackDevMiddleware(isDev: boolean) {
        if (isDev) {
            debug('Setting up webpack dev middleware...');
            middleware.webpackDev(this._instance);
        }
    }

    public create(): express.Application {
        return this._instance;
    }
}

export default new App(express()).create();