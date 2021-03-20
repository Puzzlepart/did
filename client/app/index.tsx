/* eslint-disable tsdoc/syntax */
/**
 * The App component
 *
 * @module App
 */
import React, { FunctionComponent, useState } from 'react'
import { AppContext, IAppContext, IAppState } from '../AppContext'
import { useNotificationsQuery } from '../hooks'
import { AppRouter } from './AppRouter'
import { ErrorFallback } from './ErrorFallback'
import { MobileHeader } from './MobileHeader'
import { Navigation } from './Navigation'

export const App: FunctionComponent<IAppContext> = (context: IAppContext) => {
  const [state, setState] = useState<IAppState>(null)
  const notificationsQuery = useNotificationsQuery(context.user)
  return (
    <AppContext.Provider
      value={{
        ...context,
        notificationsQuery,
        state: {
          current: state,
          set: (s: any) => setState((state_) => ({ ...state_, ...s }))
        }
      }}>
      <AppRouter />
    </AppContext.Provider>
  )
}

export { ErrorFallback, MobileHeader, Navigation, AppRouter }
