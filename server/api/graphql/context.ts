import { AuthenticationError } from 'apollo-server-express'
import 'reflect-metadata'
import { Container, ContainerInstance } from 'typedi'
import { pick } from 'underscore'
import { SubscriptionService } from '../services'
import { Subscription, User } from './resolvers/types'

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
 */
export const createContext = async ({ req }): Promise<Context> => {
  try {
    let subscription = req.user && req.user.subscription
    if (!!req.token) {
      subscription = await new SubscriptionService().findSubscriptionWithToken(req.token)
      if (!subscription) throw new AuthenticationError(null)
    }
    const requestId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    const container = Container.of(requestId)
    const context: Context = {
      container,
      subscription,
      requestId,
      user: {
        ...pick(req.user, 'id'),
        subscription: pick(subscription, 'id', 'name')
      }
    }
    container.set({
      id: 'USER_ID',
      transient: true,
      value: req.user.id
    })
    container.set({
      id: 'CONNECTION_STRING',
      transient: true,
      value: req.user.subscription.connectionString
    })
    container.set({
      id: 'OAUTH_TOKEN',
      transient: true,
      value: req.user.oauthToken
    })
    return context
  } catch (error) {
    throw error
  }
}
