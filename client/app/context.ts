import { AnyAction } from '@reduxjs/toolkit'
import { createContext, useContext } from 'react'
import { useNotificationsQuery } from '../hooks'
import { ContextUser } from './ContextUser'
import { IAppProps, IAppState } from './types'

export interface IAppContext extends IAppProps {
  /**
   * Notifications query
   */
  notificationsQuery?: ReturnType<typeof useNotificationsQuery>

  /**
   * Application state
   */
  state?: IAppState

  /**
   * Application dispatcher
   */
  dispatch?: React.Dispatch<AnyAction>
}

export const AppContext = createContext<IAppContext>(null)

/**
 * Returns app context
 */
export function useAppContext() {
  return useContext(AppContext)
}

export { ContextUser }
