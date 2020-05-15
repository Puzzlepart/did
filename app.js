require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const favicon = require('express-favicon')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('./middleware/passport')
const serveGzipped = require('./middleware/gzip')
const isAuthenticated = require('./middleware/passport/isAuthenticated')

class App {
    constructor() {
        this._ = express();
        this._.use(require('./middleware/helmet'))
        this._.use(favicon(__dirname + '/public/images/favicon/favicon.ico'))
        this._.use(logger('dev'))
        this._.use(express.json())
        this._.use(express.urlencoded({ extended: false }))
        this._.use(cookieParser())
        this.setupSession();
        this.setupViewEngine();
        this.setupAssets();
        this.setupAuth();
        this.setupApi();
        this.setupRoutes();
        this.setupErrorHandling();
    }

    setupSession() {
        this._.use(require('./middleware/session'))
    }

    setupViewEngine() {
        this._.set('views', path.join(__dirname, 'views'))
        this._.set('view engine', 'hbs')
    }

    setupAssets() {
        this._.use('/*.js', serveGzipped('text/javascript'))
        this._.use(express.static(path.join(__dirname, 'public')))
    }

    setupAuth() {
        this._.use(passport.initialize())
        this._.use(passport.session())
        this._.use('/auth', require('./routes/auth'))
    }

    setupApi() {
        this._.use(
            '/graphql',
            isAuthenticated,
            require('./middleware/graphql')
        )
    }

    setupRoutes() {
        this._.use('*', require('./routes/index'))
    }

    setupErrorHandling() {
        this._.use((_req, _res, next) => { next(createError(404)) })
        this._.use((error, req, res, _next) => {
            res.locals.error_header = 'We\'re sorry'
            res.locals.error_message = error.message
            res.status(error.status || 500)
            res.render('error')
        })
    }

    instance() {
        return this._
    }
}


module.exports = new App();
