/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
/**
 * The App component
 *
 * @module App
 */
import React, { FunctionComponent, useMemo } from 'react'
import { useNotificationsQuery } from '../hooks'
import { AppRouter } from './AppRouter'
import { AppContext, IAppContext } from './context'
import { ErrorFallback } from './ErrorFallback'
import { MobileBreadcrumb } from './MobileBreadcrumb'
import { Navigation } from './Navigation'
import useAppReducer from './reducer'
import { IAppProps } from './types'

export const App: FunctionComponent<IAppContext> = (props: IAppProps) => {
  const [state, dispatch] = useAppReducer({})
  const notificationsQuery = useNotificationsQuery(props.user)
  const context = useMemo(
    () => ({
      ...props,
      notificationsQuery,
      state,
      dispatch
    }),
    [state, notificationsQuery]
  )
  return (
    <AppContext.Provider value={context}>
      <AppRouter />
    </AppContext.Provider>
  )
}

export * from './context'
export { ErrorFallback, MobileBreadcrumb, Navigation, AppRouter }
