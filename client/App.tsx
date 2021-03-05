/* eslint-disable tsdoc/syntax */
/**
 * The App component
 *
 * @module App
 */
import { ErrorFallback, MobileHeader, Navigation } from 'components'
import { PERMISSION } from 'config/security/permissions'
import React, { FunctionComponent } from 'react'
import { isMobile } from 'react-device-detect'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import styles from './App.module.scss'
import { AppContext, IAppContext } from './AppContext'
import { useNotificationsQuery } from './hooks'
import {
  AdminPage,
  CustomersPage,
  Home,
  ProjectsPage,
  ReportsPage,
  TimesheetPage
} from './pages'
import { ProtectedRoute as Route } from './ProtectedRoute'

export const App: FunctionComponent<IAppContext> = (context: IAppContext) => {
  const { t } = useTranslation()
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
                <Route
                  path='/timesheet'
                  permission={PERMISSION.ACCESS_TIMESHEET}>
                  {isMobile && (
                    <MobileHeader text={t('navigation.timesheet')} />
                  )}
                  <TimesheetPage />
                </Route>
                <Route
                  path='/customers'
                  permission={PERMISSION.ACCESS_CUSTOMERS}>
                  {isMobile && (
                    <MobileHeader text={t('navigation.customers')} />
                  )}
                  <CustomersPage />
                </Route>
                <Route path='/projects' permission={PERMISSION.ACCESS_PROJECTS}>
                  {isMobile && <MobileHeader text={t('navigation.projects')} />}
                  <ProjectsPage />
                </Route>
                <Route path='/reports' permission={PERMISSION.ACCESS_REPORTS}>
                  {isMobile && <MobileHeader text={t('navigation.reports')} />}
                  <ReportsPage />
                </Route>
                <Route path='/admin' permission={PERMISSION.ACCESS_ADMIN}>
                  {isMobile && <MobileHeader text={t('navigation.admin')} />}
                  <AdminPage />
                </Route>
                <Route path='/'>
                  <Home />
                </Route>
              </Switch>
            </ErrorBoundary>
          </div>
        </div>
      </Router>
    </AppContext.Provider>
  )
}
