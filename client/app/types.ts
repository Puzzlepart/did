import { IToastProps } from 'components'
import { SessionContext } from '../graphql-queries/session'
import { IMobileBreadcrumbItem } from '../parts/MobileBreadcrumb'

export interface IAppProps {
  /**
   * Session context object containing user information.
   * 
   * This is retrieved from the GraphQL server and contains details about the user,
   * subscription status, and authentication providers.
   */
  sessionContext: SessionContext
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
