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
  let className = styles.root
  if (isMobile) className += ` ${styles.mobile}`
  return (
    <Router>
      <div className={className}>
        <Navigation />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Switch>
            {pages.map((page, index) => (
              <Route key={index} path={page.path}>
                {page.hidden ? (
                  <Redirect to='/' />
                ) : (
                  <>
                    {isMobile && <MobileHeader text={page.text} />}
                    <div className={styles.container}>{page.component}</div>
                  </>
                )}
              </Route>
            ))}
          </Switch>
        </ErrorBoundary>
      </div>
    </Router>
  )
}
