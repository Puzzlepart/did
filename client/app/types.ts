import { IToastProps } from 'components'
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
  /**
   * Navigation state of the application.
   */
  nav?: Record<string, IMobileBreadcrumbItem>

  /**
   * Toast state of the application.
   */
  toast?: IToastProps
}
