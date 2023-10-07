/**
 * [GraphQL](https://graphql.org/) context
 */
import createDebug from 'debug'
import get from 'get-value'
import { verify } from 'jsonwebtoken'
import { MongoClient, Db as MongoDatabase } from 'mongodb'
import 'reflect-metadata'
import { Container, ContainerInstance } from 'typedi'
import { DateObject } from '../../shared/utils/date'
import { environment, tryParseJson } from '../utils'
import { Subscription } from './resolvers/types'
import { GraphQLError } from 'graphql'
import colors from 'colors/safe'
const debug = createDebug('graphql/requestContext')

/**
 * The context object provides access to various resources and information
 * for the current request, such as the user ID, user object, user configuration,
 * provider, subscription, container instance, permissions, and MongoDB client and database.
 */
export class RequestContext {
  /**
   * Request ID
   *
   * Generated per request using Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
   */
  public requestId?: string

  /**
   * User ID
   */
  public userId?: string

  /**
   * User object
   */
  public user?: Record<string, any>

  /**
   * User configuration
   */
  public userConfiguration?: Record<string, any>

  /**
   * Provider
   *
   * `google` or `azuread-openidconnect`
   */
  public provider?: 'google' | 'azuread-openidconnect'

  /**
   * Subscription
   */
  public subscription?: Subscription

  /**
   * Container instance
   */
  public container?: ContainerInstance

  /**
   * Permissions for the logged in user, or
   * the API key used by external calls
   */
  public permissions?: string[]

  /**
   * Mongo client instance
   */
  public mcl?: MongoClient

  /**
   * Mongo database
   */
  public db?: MongoDatabase

  private constructor() {
    this.requestId = RequestContext.generateUniqueRequestId()
    this.container = Container.of(this.requestId)
  }

  /**
   * Create GraphQL context
   *
   * * Sets the default `mongodb` instance on the context
   * * Sets the user subscription on the context
   * * Checks token auth using `handleTokenAuthentication`
   * * Generates a random request ID using `Math random`
   * * Sets `CONTEXT` and `REQUEST` on the container to enable
   *   dependency injection in the resolvers.
   *
   * @param request - Express request
   * @param mcl - Mongo client
   *
   * @returns GraphQL context object
   */
  public static create = async (
    request: Express.Request,
    mcl: MongoClient
  ): Promise<RequestContext> => {
    try {
      const database = mcl.db(environment('MONGO_DB_DB_NAME'))
      const context = new RequestContext()
      debug(`Creating context for request ${colors.magenta(context.requestId)}`)
      context.mcl = mcl
      context.subscription = get(request, 'user.subscription', { default: {} })
      const apiKey = get(request, 'api_key')
      if (apiKey) {
        const { permissions, subscription } = await handleTokenAuthentication(
          apiKey,
          database
        )
        context.permissions = permissions
        context.subscription = subscription
      } else {
        context.user = get(request, 'user')
        context.userId = get(request, 'user.id')
        context.userConfiguration = tryParseJson<Record<string, any>>(
          get(request, 'user.configuration'),
          {}
        )
        context.provider = get(request, 'user.provider')
        context.permissions = get(request, 'user.role.permissions')
      }
      context.db = context.mcl.db(context.subscription.db)
      context.container.set({ id: 'CONTEXT', transient: true, value: context })
      context.container.set({ id: 'REQUEST', transient: true, value: request })
      debug(`Context created for request ${colors.magenta(context.requestId)}`)
      return context
    } catch (error) {
      throw error
    }
  }

  /**
   * Generate unique ID for the request
   */
  private static generateUniqueRequestId() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString()
  }
}

/**
 * Authenticates a user based on an API key and retrieves their subscription and permissions.
 *
 * @param apiKey - The API key to authenticate the user with.
 * @param database - The `MongoDatabase` instance to use for database operations.
 *
 * @returns An object containing the user's subscription and permissions.
 *
 * @throws If the specified token is expired or authentication fails.
 */
const handleTokenAuthentication = async (
  apiKey: string,
  database: MongoDatabase
) => {
  const { expires, subscriptionId: _id } = verify(
    apiKey,
    environment('API_TOKEN_SECRET')
  ) as any
  const expired = new DateObject(expires).jsDate < new Date()
  if (expired) throw new GraphQLError('The specified token is expired.')
  const [token, subscription] = await Promise.all([
    database.collection('api_tokens').findOne({
      apiKey,
      expires: {
        $gte: new Date()
      }
    }),
    database.collection('subscriptions').findOne({
      _id
    })
  ])
  if (!token || !subscription)
    throw new GraphQLError('Failed to authenticate with the specified token.')
  return { subscription, permissions: token.permissions }
}
