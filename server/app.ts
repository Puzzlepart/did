/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * NodeJS Express App
 *
 * @module App
 */
require('dotenv').config()
import bodyParser from 'body-parser'
import express from 'express'
import bearerToken from 'express-bearer-token'
import favicon from 'express-favicon'
import createError from 'http-errors'
import { MongoClient } from 'mongodb'
import logger from 'morgan'
import path from 'path'
import _ from 'underscore'
import { setupGraphQL } from './graphql/setupGraphQL'
import {
  helmetMiddleware,
  passportMiddleware,
  redisSessionMiddleware,
  serveGzippedMiddleware
} from './middleware'
import authRoute from './routes/auth'
import { environment } from './utils'

/**
 * did `express` App
 *
 * Defines our `express` app with our middleware
 * for helmet, passport and redis.
 *
 * - Setting up session handling
 * - Setting [hbs](https://www.npmjs.com/package/hbs) as view engine
 * - Setting up static assets
 * - Setting up auth with [passport](https://www.npmjs.com/package/passport)
 * - Setting up [GraphQL](https://graphql.org/)
 * - Setting up routes
 * - Setting up error handling
 *
 * Uses the following modules directly:
 *
 * * [body-parser](https://www.npmjs.com/package/body-parser)
 * * [express](https://www.npmjs.com/package/express)
 * * [express-bearer-token](https://www.npmjs.com/package/express-bearer-token)
 * * [express-favicon](https://www.npmjs.com/package/express-favicon)
 * * [http-errors](https://www.npmjs.com/package/http-errors)
 * * [passport](https://www.npmjs.com/package/passport)
 * * [mongodb](https://www.npmjs.com/package/mongodb)
 * * [morgan](https://www.npmjs.com/package/morgan)
 * * [underscore](https://www.npmjs.com/package/underscore)
 */
export class App {
  /**
   * The express.Application instance
   */
  public instance: express.Application

  /**
   * Mongo client
   */
  private _mcl: MongoClient

  /**
   * Bootstrapping the express application
   */
  constructor() {
    this.instance = express()
    this.instance.use(helmetMiddleware())
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
   * * Setting up our [GraphQL](https://graphql.org/) API
   * * Setting up routes
   * * Setting up error handling
   */
  public async setup() {
    this._mcl = await MongoClient.connect(
      environment('MONGO_DB_CONNECTION_STRING'),
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
    this.instance.use(redisSessionMiddleware)
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
    this.instance.use('/*.js', serveGzippedMiddleware('text/javascript'))
    this.instance.use(express.static(path.join(__dirname, 'public')))
  }

  /**
   * Setup authentication
   *
   * * Using `passport` for user login
   * * Using `express-bearer-token` package to support external API calls
   * * Setting up auth route at `/auth`
   */
  setupAuth() {
    const _passport = passportMiddleware(this._mcl)
    this.instance.use(bearerToken({ reqKey: 'api_key' }))
    this.instance.use(_passport.initialize())
    this.instance.use(_passport.session())
    this.instance.use('/auth', authRoute)
  }

  /**
   * Setup GraphQL API with MongoDB Client
   */
  async setupGraphQL() {
    await setupGraphQL(this.instance, this._mcl)
  }

  /**
   * Setup routes
   *
   * Configuring `/` to redirect to the login page
   * if the user is not authenticated, and `*` to use
   * our index route giving the React Router full
   * control of the routing.
   */
  setupRoutes() {
    const index = express.Router()
    index.get('/', (request, response) => {
      const url = request.originalUrl.split('?')[0]
      if (request.isUnauthenticated() && url !== '/') {
        return response.redirect(
          `/auth/azuread-openidconnect/signin?redirectUrl=${request.originalUrl}`
        )
      }
      return response.render('index')
    })
    this.instance.use('*', index)
  }

  /**
   * Setup error handling using `http-errors`
   */
  setupErrorHandling() {
    this.instance.use((_req, _res, next) => next(createError(401)))
    this.instance.use(
      (error: any, _request: express.Request, response: express.Response) => {
        response.render('index', {
          error: JSON.stringify(_.pick(error, 'name', 'message', 'status'))
        })
      }
    )
  }
}

export default new App()
