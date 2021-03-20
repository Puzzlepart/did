import { Subscription } from 'types'
import { ContextUser } from './ContextUser'
import { IMobileBreadcrumbItem } from './MobileBreadcrumb'

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
  nav?: Record<string, IMobileBreadcrumbItem>
}
