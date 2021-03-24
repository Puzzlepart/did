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
  const { pages, getUserConfiguration } = useAppContext()
  const [, hasPermission] = usePermissions()
  const classNames = [styles.root]
  if (isMobile) classNames.push(styles.mobile)
  if (getUserConfiguration<boolean>('ui.stickyNavigation') && !isMobile) {
    classNames.push(styles.sticky)
  }
  return (
    <Router>
      <div className={classNames.join(' ')}>
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
