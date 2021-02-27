/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
import bodyParser from 'body-parser'
import express from 'express'
import bearerToken from 'express-bearer-token'
import favicon from 'express-favicon'
import createError from 'http-errors'
import { MongoClient } from 'mongodb'
import logger from 'morgan'
import path from 'path'
import { pick } from 'underscore'
import { setupGraphQL } from './graphql'
import serveGzipped from './middleware/gzip'
import passport from './middleware/passport'
import session from './middleware/session'
import authRoute from './routes/auth'
import env from './utils/env'

/**
 * Did Express.js App
 */
export class App {
  /**
   * The express.Application instance
   */
  public instance: express.Application

  /**
   * Mongo client
   */
  private _mongoClient: MongoClient

  /**
   * Bootstrapping the express application
   */
  constructor() {
    this.instance = express()
    this.instance.use(require('./middleware/helmet').default)
    this.instance.use(
      favicon(path.join(__dirname, 'public/images/favicon/favicon.ico'))
    )
    this.instance.use(logger('dev'))
    this.instance.use(express.json())
    this.instance.use(express.urlencoded({ extended: false }))
    this.instance.use(bodyParser.json())
    this.instance.disable('view cache')
  }

  /**
   * Setup app
   * 
   * * Connecting to our Mongo client
   * * Setting up sessions 
   * * Setting up view engine
   * * Setting up static assets
   * * Setting up authentication
   * * Setting up our GraphQL API
   * * Setting up routes
   * * Setting up error handling
   */
  public async setup() {
    this._mongoClient = await MongoClient.connect(
      env('MONGO_DB_CONNECTION_STRING'),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    this.setupSession()
    this.setupViewEngine()
    this.setupAssets()
    this.setupAuth()
    await this.setupGraphQL()
    this.setupRoutes()
    this.setupErrorHandling()
  }

  /**
   * Setup sessions using connect-redis
   */
  setupSession() {
    this.instance.use(session)
  }

  /**
   * Setup hbs as view engine
   */
  setupViewEngine() {
    this.instance.set('views', path.join(__dirname, 'views'))
    this.instance.set('view engine', 'hbs')
  }

  /**
   * Setup static assets
   * 
   * * Serving *.js gzipped
   * * Serving our public folder
   */
  setupAssets() {
    this.instance.use('/*.js', serveGzipped('text/javascript'))
    this.instance.use(express.static(path.join(__dirname, 'public')))
  }

  /**
   * Setup authentication
   * 
   * * Using passport for user login
   * * Using express-bearer-token package to support external API calls
   * * Setting up auth route at /auth
   */
  setupAuth() {
    const _passport = passport(this._mongoClient)
    this.instance.use(bearerToken({ reqKey: 'api_key' }))
    this.instance.use(_passport.initialize())
    this.instance.use(_passport.session())
    this.instance.use('/auth', authRoute)
  }

  /**
   * Setup graphql
   */
  async setupGraphQL() {
    await setupGraphQL(this.instance, this._mongoClient)
  }

  /**
   * Setup routes
   * 
   * * Setting up * to use our index route giving the React
   * Router full control of the routing.
   */
  setupRoutes() {
    const index = express.Router()
    index.get('/', (_req, res) => {
      return res.render('index')
    })
    this.instance.use('*', index)
  }

  /**
   * Setup error handling using http-errors
   */
  setupErrorHandling() {
    this.instance.use((_req, _res, next) => next(createError()))
    this.instance.use(
      (error: any, _req: express.Request, res: express.Response) => {
        res.render('index', {
          error: JSON.stringify(pick(error, 'name', 'message', 'status'))
        })
      }
    )
  }
}

export default new App()
