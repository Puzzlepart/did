require('dotenv').config()
const pkg = require('../package.json')
const createError = require('http-errors')
const express = require('express')
const favicon = require('express-favicon')
const path = require('path')
const bodyParser = require('body-parser')
const logger = require('morgan')
const passport = require('./middleware/passport')
const serveGzipped = require('./middleware/gzip')
const bearerToken = require('express-bearer-token')
const { pick } = require('underscore')

class App {
  constructor(app) {
    this._ = app
    this._.use(require('./middleware/helmet'))
    this._.use(favicon(path.join(__dirname, 'public/images/favicon/favicon.ico')))
    this._.use(logger('dev'))
    this._.use(express.json())
    this._.use(express.urlencoded({ extended: false }))
    this._.use(bodyParser.json())
    this.setupSession()
    this.setupViewEngine()
    this.setupAssets()
    this.setupAuth()
    this.setupGraphQL()
    this.setupRoutes()
    this.setupErrorHandling()
    this._.disable('view cache')
  }

  /**
   * Setup sessions
   */
  setupSession() {
    this._.use(require('./middleware/session'))
  }

  /**
   * Setup view engine
   */
  setupViewEngine() {
    this._.set('views', path.join(__dirname, 'views'))
    this._.set('view engine', 'hbs')
  }

  /**
   * Setup static assets
   */
  setupAssets() {
    this._.use('/*.js', serveGzipped('text/javascript'))
    this._.use(express.static(path.join(__dirname, 'public')))
  }

  /**
   * Setup authentication
   */
  setupAuth() {
    this._.use(bearerToken())
    this._.use(passport.initialize())
    this._.use(passport.session())
    this._.use('/auth', require('./routes/auth'))
  }

  /**
   * Setup graphql
   */
  setupGraphQL() {
    const server = require('./api/graphql')
    server.applyMiddleware({
      app: this._,
      path: '/graphql',
    })
  }

  /**
   * Setup routes
   */
  setupRoutes() {
    const index = express.Router()
    index.get('/', (req, res) => {
      res.render('index')
    })
    this._.use('*', index)
  }

  /**
   * Setup error handling
   */
  setupErrorHandling() {
    this._.use((_req, _res, next) => {
      next(createError(404))
    })
    this._.use((error, _req, res) => {
      res.status(error.status || 500)
      res.render('index', { error: JSON.stringify(pick(error, 'name', 'message', 'status')) })
    })
  }

  /**
   * App instance
   */
  instance() {
    return this._
  }
}

module.exports = new App(express())
