import { IPivotItemProps } from 'office-ui-fabric-react'
import { createContext } from 'react'
import { Subscription } from 'types'
import { ContextUser } from './ContextUser'
import { useNotificationsQuery } from './hooks'

export interface IAppState {
  nav?: IPivotItemProps
}

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

  /**
   * Application state
   */
  state?: { current: IAppState; set: (state: IAppState) => void }
}

export const AppContext = createContext<IAppContext>(null)

export { ContextUser }
