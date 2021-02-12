/* eslint-disable require-await */
import createDebug from 'debug'
import get from 'get-value'
import { MongoClient } from 'mongodb'
import 'reflect-metadata'
import { Container, ContainerInstance } from 'typedi'
import { Subscription } from './resolvers/types'
const debug = createDebug('api/graphql/context')

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
    const context: Context = {}
    context.client = client
    // TODO: Temp hack for 'Property 'id' does not exist on type 'User'.'
    context.userId = get(request, 'user.id')
    context.subscription = get(request, 'user.subscription')
    context.permissions = get(request, 'user.role.permissions', { default: [] })
    // TODO: Support token authentication
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
