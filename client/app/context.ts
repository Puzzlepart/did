/* eslint-disable @typescript-eslint/ban-types */
import { AnyAction } from '@reduxjs/toolkit'
import { IToastProps } from 'components'
import get from 'get-value'
import { PageComponent } from 'pages/types'
import { createContext, useContext } from 'react'
import { SubscriptionSettings } from 'types'
import { useNotificationsQuery } from '../hooks'
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

  /**
   * Displays a toast message with the given properties and duration (which defaults to 6 seconds).
   *
   * @param text - The text of the toast message.
   * @param intent - The intent of the toast message (default: **info**).
   * @param duration - The duration in seconds to display the toast message (default: **6**).
   * @param additionalProps - Additional properties to pass to the toast message.
   */
  displayToast: (
    text: IToastProps['text'],
    intent?: IToastProps['intent'],
    duration?: number,
    additionalProps?: Partial<IToastProps>
  ) => void
}

export const AppContext = createContext<IAppContext>(null)

/**
 * Returns the current context value for the app.
 *
 * Uses `useContext` with `AppContext`
 *
 * @returns `IAppContext`
 */
export function useAppContext(): IAppContext {
  const context = useContext(AppContext)
  const getUserConfiguration = (path: string) =>
    get(context.user.configuration, path)
  return {
    ...context,
    isAuthenticated: !!context.user?.id,
    getUserConfiguration
  }
}

/**
 * Retrieves the subscription settings from the app context.
 * If a specific path is provided, returns the value at that path in the settings object.
 * If no path is provided, returns the entire settings object.
 *
 * @param path - Optional path to a specific setting value.
 *
 * @returns The subscription settings or a specific setting value.
 */
export function useSubscriptionSettings<T = SubscriptionSettings>(
  path?: string,
  defaultValue?: T
) {
  const { subscription } = useAppContext()
  if (path) return get(subscription.settings, path, defaultValue) as T
  return subscription.settings as T
}

export { ContextUser } from './ContextUser'
