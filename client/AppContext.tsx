import { createContext } from 'react'
import { Subscription } from 'types'
import { ContextUser } from './ContextUser'
import { useNotificationsQuery } from './hooks'

export interface IAppContext {
  /**
   * The currently logged in user
   */
  user?: ContextUser

  /**
   * Subscription
   */
  subscription?: Subscription

  /**
   * Notifications query
   */
  notificationsQuery?: ReturnType<typeof useNotificationsQuery>

  /**
   * Auth providers
   */
  authProviders?: string[]
}

export const AppContext = createContext<IAppContext>(null)

export { ContextUser }
