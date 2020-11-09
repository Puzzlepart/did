import { Navigation } from 'components/Navigation'
import * as React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import styles from './App.module.scss'
import { AppContext, IAppContext } from './AppContext'
import { Admin, Customers, Home, Projects, Reports, Timesheet } from './pages'
import { ProtectedRoute as Route } from './ProtectedRoute'
import { PERMISSION } from 'config/security/permissions'
import { isMobile } from 'react-device-detect'
import { MobileHeader } from 'components/MobileHeader'
import { useTranslation } from 'react-i18next'

export const App: React.FunctionComponent<IAppContext> = (context: IAppContext) => {
  const { t } = useTranslation()
  if (isMobile) styles.root += ` ${styles.mobile}`
  return (
    <AppContext.Provider value={context}>
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
