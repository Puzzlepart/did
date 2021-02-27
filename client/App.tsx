import { MobileHeader } from 'components/MobileHeader'
import { Navigation } from 'components/Navigation'
import { PERMISSION } from 'config/security/permissions'
import React, { FunctionComponent } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import styles from './App.module.scss'
import { AppContext, IAppContext } from './AppContext'
import { useNotificationsQuery } from './hooks'
import { Admin, Customers, Home, Projects, Reports, Timesheet } from './pages'
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
            <Switch>
              <Route path='/timesheet' permission={PERMISSION.ACCESS_TIMESHEET}>
                {isMobile && <MobileHeader text={t('navigation.timesheet')} />}
                <Timesheet />
              </Route>
              <Route path='/customers' permission={PERMISSION.ACCESS_CUSTOMERS}>
                {isMobile && <MobileHeader text={t('navigation.customers')} />}
                <Customers />
              </Route>
              <Route path='/projects' permission={PERMISSION.ACCESS_PROJECTS}>
                {isMobile && <MobileHeader text={t('navigation.projects')} />}
                <Projects />
              </Route>
              <Route path='/reports' permission={PERMISSION.ACCESS_REPORTS}>
                {isMobile && <MobileHeader text={t('navigation.reports')} />}
                <Reports />
              </Route>
              <Route path='/admin' permission={PERMISSION.ACCESS_ADMIN}>
                {isMobile && <MobileHeader text={t('navigation.admin')} />}
                <Admin />
              </Route>
              <Route path='/'>
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </AppContext.Provider>
  )
}
