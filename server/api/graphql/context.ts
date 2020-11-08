import { AuthenticationError } from 'apollo-server-express'
import createDebug from 'debug'
import get from 'get-value'
import 'reflect-metadata'
import { Container, ContainerInstance } from 'typedi'
import { SubscriptionService } from '../services'
import { Subscription, User } from './resolvers/types'
const debug = createDebug('api/graphql/context')

export class Context {
  /**
   * Request ID
   *
   * Generated per request using Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
   */
  public requestId?: string

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

  /**
   * Permissions
   */
  public permissions?: string[]
}

/**
 * Create context
 *
 * @param {Express.Request} request Express request
 */
export const createContext = async (request: Express.Request): Promise<Context> => {
  try {
    let context: Context = {}
    context.user = null
    context.subscription = get(request, 'user.subscription')
    context.permissions = []
    if (!!request.token) {
      const token = await new SubscriptionService().getToken(request.token)
      if (!token) throw new AuthenticationError('Token is invalid.')
      context = { ...context, ...token }
    } else {
      context.user = !!context.permissions && { id: get(request, 'user.id') }
    }
    context.requestId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString()
    context.container = Container.of(context.requestId)
    context.container.set({ id: 'CONTEXT', transient: true, value: context })
    context.container.set({ id: 'REQUEST', transient: true, value: request })
    // eslint-disable-next-line no-console
    console.log(context.subscription, context.permissions)
    debug(`Creating context for request ${context.requestId}`)
    return context
  } catch (error) {
    throw error
  }
}
