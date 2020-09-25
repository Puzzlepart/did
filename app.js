require('dotenv').config()
const pkg = require('./package.json')
const createError = require('http-errors')
const express = require('express')
const favicon = require('express-favicon')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
const passport = require('./middleware/passport')
const serveGzipped = require('./middleware/gzip')
const SubscriptionService = require('./services/subscription')
const bearerToken = require('express-bearer-token')
const helmet = require('helmet')

class App {
  constructor() {
    this._ = express()
    this._.use(helmet())
    this._.use(favicon(path.join(__dirname, pkg.config.public, 'images/favicon/favicon.ico')))
    this._.use(logger('dev'))
    this._.use(express.json())
    this._.use(express.urlencoded({ extended: false }))
    this._.use(cookieParser())
    this._.use(bodyParser.json())
    this.setupSession()
    this.setupViewEngine()
    this.setupAssets()
    this.setupAuth()
    this.setupGraphQL()
    this.setupRoutes()
    this.setupErrorHandling()
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
    this._.use(express.static(path.join(__dirname, pkg.config.public)))
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
    this._.use('/graphdoc', express.static(path.join(__dirname, 'public/graphdoc')))
    this._.use('*', require('./routes/index'))
  }

  /**
   * Setup error handling
   */
  setupErrorHandling() {
    this._.use((_req, _res, next) => {
      next(createError(404))
    })
    this._.use((error, _req, res, _next) => {
      res.status(error.status || 500)
      res.render('error', { error })
    })
  }

  /**
   * App instance
   */
  instance() {
    return this._
  }
}

module.exports = new App()
