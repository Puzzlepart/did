/* eslint-disable tsdoc/syntax */
/**
 * The App component
 *
 * @module App
 */
import { useAppContext } from 'AppContext'
import { usePermissions } from 'hooks'
import React from 'react'
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
import { MobileBreadcrumb } from './MobileBreadcrumb'
import { Navigation } from './Navigation'

/**
 * App router
 *
 * @category App
 */
export const AppRouter: React.FC = () => {
  const { pages } = useAppContext()
  const [, hasPermission] = usePermissions()
  let className = styles.root
  if (isMobile) className += ` ${styles.mobile}`
  return (
    <Router>
      <div className={className}>
        <Navigation />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Switch>
            {pages.map((Page, index) => (
              <Route key={index} path={Page.path}>
                {!hasPermission(Page.permission) ? (
                  <Redirect to='/' />
                ) : (
                  <>
                    <MobileBreadcrumb page={Page} />
                    <div className={styles.container}>
                      <Page />
                    </div>
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
