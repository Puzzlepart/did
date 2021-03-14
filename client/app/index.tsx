/* eslint-disable tsdoc/syntax */
/**
 * The App component
 *
 * @module App
 */
import React, { FunctionComponent } from 'react'
import { isMobile } from 'react-device-detect'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { AppContext, IAppContext } from '../AppContext'
import { useNotificationsQuery } from '../hooks'
import { usePages } from '../pages/usePages'
import styles from './App.module.scss'
import { ErrorFallback } from './ErrorFallback'
import { MobileHeader } from './MobileHeader'
import { Navigation } from './Navigation'
import { ProtectedRoute as Route } from './ProtectedRoute'

export const App: FunctionComponent<IAppContext> = (context: IAppContext) => {
  const { pages } = usePages()
  if (isMobile) styles.root += ` ${styles.mobile}`
  const notificationsQuery = useNotificationsQuery(context.user)
  return (
    <AppContext.Provider value={{ ...context, notificationsQuery }}>
      <Router>
        <div className={styles.root}>
          <Navigation />
          <div className={styles.container}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Switch>
                {pages.map((page, index) => (
                  <Route
                    key={index}
                    path={page.path}
                    permission={page.permission}>
                    {isMobile && <MobileHeader text={page.text} />}
                    {page.component}
                  </Route>
                ))}
              </Switch>
            </ErrorBoundary>
          </div>
        </div>
      </Router>
    </AppContext.Provider>
  )
}

export { ErrorFallback, MobileHeader, Navigation }
