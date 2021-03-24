/* eslint-disable @typescript-eslint/ban-types */
import { AnyAction } from '@reduxjs/toolkit'
import get from 'get-value'
import { ReactHookFunction } from 'hooks/types'
import { PageComponent } from 'pages/types'
import { createContext, useContext } from 'react'
import { useNotificationsQuery } from '../hooks'
import { ContextUser } from './ContextUser'
import { IAppProps, IAppState } from './types'

export interface IAppContext extends IAppProps {
  /**
   * Pages
   */
  pages?: PageComponent[]

  /**
   * Notifications query
   */
  notifications?: ReturnType<typeof useNotificationsQuery>

  /**
   * Application state
   */
  state?: IAppState

  /**
   * Application dispatcher
   */
  dispatch?: React.Dispatch<AnyAction>

  /**
   * Is authenticated
   */
  isAuthenticated?: boolean

  /**
   * Get user configuration
   */
   getUserConfiguration: <T = any>(path: string) => T
}

export const AppContext = createContext<IAppContext>(null)

/**
 * Returns the current context value for the app.
 *
 * Uses `useContext` with `AppContext`
 *
 * @returns `IAppContext`
 */
export const useAppContext: ReactHookFunction<{}, IAppContext> = () => {
  const context = useContext(AppContext)
  const getUserConfiguration = (path: string) =>
    get(context.user.configuration, path)
  return {
    ...context,
    isAuthenticated: !!context.user?.id,
    getUserConfiguration,
  }
}

export { ContextUser }
