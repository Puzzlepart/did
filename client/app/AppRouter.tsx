/* eslint-disable tsdoc/syntax */
/**
 * The App component
 *
 * @module App
 */
import { usePages } from 'pages/usePages'
import React, { FunctionComponent } from 'react'
import { isMobile } from 'react-device-detect'
import { ErrorBoundary } from 'react-error-boundary'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import styles from './App.module.scss'
import { ErrorFallback } from './ErrorFallback'
import { MobileHeader } from './MobileHeader'
import { Navigation } from './Navigation'

export const AppRouter: FunctionComponent = () => {
  const { pages } = usePages()
  return (
    <Router>
      <div className={styles.root}>
        <Navigation />
        <div className={styles.container}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Switch>
              {pages.map((page, index) => (
                <Route key={index} path={page.path}>
                  {page.hidden ? (
                    <Redirect to='/' />
                  ) : (
                    <>
                      {isMobile && <MobileHeader text={page.text} />}
                      {page.component}
                    </>
                  )}
                </Route>
              ))}
            </Switch>
          </ErrorBoundary>
        </div>
      </div>
    </Router>
  )
}
