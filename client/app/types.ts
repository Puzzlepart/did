import { IPivotItemProps } from 'office-ui-fabric-react'
import { Subscription } from 'types'
import { ContextUser } from './ContextUser'

export interface IAppProps {
  /**
   * The currently logged in user
   */
  user?: ContextUser

  /**
   * Subscription
   */
  subscription?: Subscription

  /**
   * Auth providers
   */
  authProviders?: string[]
}

export interface IAppState {
  nav?: IPivotItemProps
}
