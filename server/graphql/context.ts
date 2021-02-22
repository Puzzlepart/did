import { AuthenticationError } from 'apollo-server-express'
import createDebug from 'debug'
import get from 'get-value'
import { verify } from 'jsonwebtoken'
import { MongoClient } from 'mongodb'
import 'reflect-metadata'
import { Container, ContainerInstance } from 'typedi'
import { DateObject } from '../../shared/utils/date'
import env from '../utils/env'
import { Subscription } from './resolvers/types'
const debug = createDebug('graphql/context')

export class Context {
  /**
   * Request ID
   *
   * Generated per request using Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
   */
  public requestId?: string

  /**
   *
   */
  public userId?: string

  /**
   * Subscription
   */
  public subscription?: Subscription

  /**
   * Container instance
   */
  public container?: ContainerInstance

  /**
   * Permissions
   */
  public permissions?: string[]

  /**
   * Mongo client
   */
  public client?: MongoClient
}

/**
 * Create context
 *
 * @param {Express.Request} request Express request
 * @param {MongoClient} client Mongo client
 */
export const createContext = async (
  request: Express.Request,
  client: MongoClient
): Promise<Context> => {
  try {
    const db = client.db(env('MONGO_DB_DB_NAME'))
    const context: Context = {}
    context.client = client
    context.subscription = get(request, 'user.subscription')
    const apiKey = get(request, 'api_key')
    if (apiKey) {
      const { expires, subscriptionId } = verify(apiKey, env('API_TOKEN_SECRET')) as any
      const expired = new DateObject(expires).jsDate < new Date()
      if (expired)
        throw new AuthenticationError('The specified token is expired.')
      const [token, subscription] = await Promise.all([
        db.collection('api_tokens').findOne({
          apiKey,
          expires: {
            $gte: new Date()
          }
        }),
        db.collection('subscriptions').findOne({
          id: subscriptionId
        })
      ])
      if (!token || !subscription)
        throw new AuthenticationError('Failed to authenticate with the specified token.')
      context.permissions = token.permissions
    } else {
      context.userId = get(request, 'user.id')
      context.permissions = get(request, 'user.role.permissions')
    }
    context.requestId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString()
    context.container = Container.of(context.requestId)
    context.container.set({ id: 'CONTEXT', transient: true, value: context })
    context.container.set({ id: 'REQUEST', transient: true, value: request })
    debug(`Creating context for request ${context.requestId}`)
    return context
  } catch (error) {
    throw error
  }
}
