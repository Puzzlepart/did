import { Subscription } from 'types'
import { IMobileBreadcrumbItem } from '../parts/MobileBreadcrumb'
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
  nav?: Record<string, IMobileBreadcrumbItem>
}
