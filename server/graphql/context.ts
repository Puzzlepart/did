import { AuthenticationError } from 'apollo-server-express'
import createDebug from 'debug'
import get from 'get-value'
import { verify } from 'jsonwebtoken'
import { Db as MongoDatabase, MongoClient } from 'mongodb'
import 'reflect-metadata'
import { Container, ContainerInstance } from 'typedi'
import { DateObject } from '../../shared/utils/date'
import { environment } from '../utils'
import { Subscription } from './resolvers/types'
const debug = createDebug('graphql/context')

/**
 * [GraphQL](https://graphql.org/) context
 */
export class Context {
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
}

/**
 * Generate unique ID for the request
 */
export function generateUniqueRequestId() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString()
}

/**
 * Create GraphQL context
 *
 * * Sets the default mongodb instance on the context
 * * Sets the user subscription on the context
 * * Checks token auth using handleTokenAuthentication
 * * Generates a random request ID using Math random
 * * Sets CONTEXT and REQUEST on the container to enable
 *   dependency injection in the resolvers.
 *
 * @param request - Express request
 * @param mcl - Mongo client
 */
export const createContext = async (
  request: Express.Request,
  mcl: MongoClient
): Promise<Context> => {
  try {
    const database = mcl.db(environment('MONGO_DB_DB_NAME'))
    const context: Context = {}
    context.requestId = generateUniqueRequestId()
    context.container = Container.of(context.requestId)
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
      context.userId = get(request, 'user.id')
      context.provider = get(request, 'user.provider')
      context.permissions = get(request, 'user.role.permissions')
    }
    context.db = context.mcl.db(context.subscription.db)
    context.container.set({ id: 'CONTEXT', transient: true, value: context })
    context.container.set({ id: 'REQUEST', transient: true, value: request })
    debug(`Creating context for request ${context.requestId}`)
    return context
  } catch (error) {
    throw error
  }
}

/**
 * Handle token authentication
 *
 * @param apiKey -Api key
 * @param db - Mongodb database
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
  if (expired) throw new AuthenticationError('The specified token is expired.')
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
    throw new AuthenticationError(
      'Failed to authenticate with the specified token.'
    )
  return { subscription, permissions: token.permissions }
}
