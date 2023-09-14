/**
 * The App component
 *
 * @module App
 */
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter as Router } from 'react-router-dom'
import { StyledComponent } from 'types'
import { ErrorFallback, Navigation } from '../parts'
import { AppSwitch } from './AppSwitch'
import { useAppClassName } from './useAppClassName'
import styles from './App.module.scss'

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
export const AppRouter: StyledComponent = () => {
  const className = useAppClassName(AppRouter, styles)
  return (
    <Router>
      <div className={className}>
        <Navigation />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AppSwitch />
        </ErrorBoundary>
      </div>
    </Router>
  )
}

AppRouter.className = styles.app