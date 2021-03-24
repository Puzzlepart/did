/* eslint-disable tsdoc/syntax */
/**
 * The App component
 *
 * @module App
 */
import { useAppContext } from 'AppContext'
import { usePermissions } from 'hooks'
import React from 'react'
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
import { useAppClassName } from './useAppClassName'

/**
 * App router that uses `<Switch />` from
 * [react-router-dom](https://www.npmjs.com/package/react-router-dom)
 * to navigate between the different pages in the app.
 *
 * Also uses `<ErrorBoundary />` from
 * [react-error-boundary](https://www.npmjs.com/package/react-error-boundary)
 * to catch errors instead of making them break everything
 *
 * @category App
 */
export const AppRouter: React.FC = () => {
  const { pages } = useAppContext()
  const [, hasPermission] = usePermissions()
  const className = useAppClassName(styles)
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
                    <MobileBreadcrumb page={Page} hidden={Page.path === '/'} />
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

