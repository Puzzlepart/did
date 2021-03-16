/* eslint-disable tsdoc/syntax */
/**
 * The App component
 *
 * @module App
 */
import React, { FunctionComponent } from 'react'
import { isMobile } from 'react-device-detect'
import { AppContext, IAppContext } from '../AppContext'
import { useNotificationsQuery } from '../hooks'
import styles from './App.module.scss'
import { AppRouter } from './AppRouter'
import { ErrorFallback } from './ErrorFallback'
import { MobileHeader } from './MobileHeader'
import { Navigation } from './Navigation'

export const App: FunctionComponent<IAppContext> = (context: IAppContext) => {
  if (isMobile) styles.root += ` ${styles.mobile}`
  const notificationsQuery = useNotificationsQuery(context.user)
  return (
    <AppContext.Provider value={{ ...context, notificationsQuery }}>
      <AppRouter />
    </AppContext.Provider>
  )
}

export { ErrorFallback, MobileHeader, Navigation, AppRouter }
