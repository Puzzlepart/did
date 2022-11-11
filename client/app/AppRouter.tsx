/**
 * The App component
 *
 * @module App
 */
import React, { FC } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter as Router } from 'react-router-dom'
import { ErrorFallback, Navigation } from '../parts'
import styles from './App.module.scss'
import { AppSwitch } from './AppSwitch'
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
export const AppRouter: FC = () => {
  const className = useAppClassName(styles)
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
