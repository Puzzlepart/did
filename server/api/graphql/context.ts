import { AuthenticationError } from 'apollo-server-express'
import createDebug from 'debug'
import get from 'get-value'
import 'reflect-metadata'
import { Container, ContainerInstance } from 'typedi'
import { pick } from 'underscore'
import { SubscriptionService } from '../services'
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
  public userId?: string;

  /**
   * Subscription
   */
  public subscription?: Subscription

  /**
   * Container instance
   */
  public container?: ContainerInstance

  /**
   * Is authorized
   */
  public isAuthorized?: boolean
}

/**
 * Create context
 *
 * @param {any} request Express request
 */
export const createContext = async (request: any): Promise<Context> => {
  try {
    let isAuthorized = false
    let user = null
    let subscription = get(request, 'user.subscription')
    if (!!request.token) {
      subscription = await new SubscriptionService().findSubscriptionWithToken(request.token)
      if (!subscription) throw new AuthenticationError(null)
      isAuthorized = true
    } else {
      isAuthorized = !!get(request, 'user')
      user = isAuthorized && {
        ...pick(get(request, 'user', { default: {} }), 'id'),
        subscription: pick(subscription, 'id', 'name', 'settings')
      }
    }
    const requestId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString()
    const container = Container.of(requestId)
    const context: Context = {
      container,
      subscription,
      requestId,
      userId: user.id,
      isAuthorized
    }
    container.set({ id: 'CONTEXT', transient: true, value: context })
    container.set({ id: 'REQUEST', transient: true, value: request })
    debug(`Creating context for request ${requestId}`)
    return context
  } catch (error) {
    throw error
  }
}
