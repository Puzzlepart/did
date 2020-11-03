import { AuthenticationError } from 'apollo-server-express'
import { MSGraphService, AzStorageService, SubscriptionService } from '../../services'
import { Subscription, User } from './types'

export class Context {
  public services?: {
    msgraph?: MSGraphService
    azstorage?: AzStorageService
    subscription?: SubscriptionService
  }
  public user?: User
  public subscription?: Subscription
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
    } else if (!req.user) return {}
    const services = {
      azstorage: new AzStorageService(subscription),
      subscription: new SubscriptionService(),
      msgraph: !!req.user && new MSGraphService().init(req),
    }
    return {
      services,
      user: req.user || {},
      subscription,
    }
  } catch (error) {
    throw error
  }
}
