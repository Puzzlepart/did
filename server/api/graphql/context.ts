import { AuthenticationError } from 'apollo-server-express'
import 'reflect-metadata'
import { Container, ContainerInstance } from 'typedi'
import { pick } from 'underscore'
import { SubscriptionService } from '../services'
import { Subscription, User } from './resolvers/types'
import createDebug from 'debug'
const debug = createDebug('api/graphql/context')

export class Context {
  /**
   * Request ID
   */
  public requestId?: number

  /**
   * User
   */
  public user?: User

  /**
   * Subscription
   */
  public subscription?: Subscription

  /**
   * Container instance
   */
  public container?: ContainerInstance
}

/**
 * Create context
 * 
 * @param {any} request Express request
 */
export const createContext = async (request: any): Promise<Context> => {
  try {
    let subscription = request.user && request.user.subscription
    if (!!request.token) {
      subscription = await new SubscriptionService().findSubscriptionWithToken(request.token)
      if (!subscription) throw new AuthenticationError(null)
    }
    const { user } = request
    const requestId = user.id + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    const container = Container.of(requestId)
    const context: Context = {
      container,
      subscription: pick(subscription, 'id', 'name'),
      requestId,
      user: {
        ...pick(user, 'id'),
        subscription: pick(subscription, 'id', 'name')
      }
    }
    container.set({ id: 'USER_ID', transient: true, value: user.id })
    container.set({ id: 'CONNECTION_STRING', transient: true, value: user.subscription.connectionString })
    container.set({ id: 'REQUEST', transient: true, value: request })
    debug(`Creating context for request ${requestId}`)
    return context
  } catch (error) {
    throw error
  }
}
