import { Navigation } from 'components/Navigation'
import * as React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import styles from './App.module.scss'
import { AppContext, IAppContext } from './AppContext'
import { Admin, Customers, Home, Projects, Reports, Timesheet } from './pages'
import { ProtectedRoute as Route } from './ProtectedRoute'
import * as permissions from 'config/security/permissions'
import { isMobile } from 'react-device-detect'

export const App = (context: IAppContext): JSX.Element => {
    if (isMobile) styles.root += ` ${styles.mobile}`
    return (
        <AppContext.Provider value={context}>
            <Router>
                <div className={styles.root}>
                    <Navigation />
                    <div className={styles.container}>
                        <Switch>
                            <Route
                                path='/timesheet'
                                permission={permissions.accessTimesheet}>
                                <Timesheet />
                            </Route>
                            <Route
                                path='/customers'
                                permission={permissions.accessCustomers}>
                                <Customers />
                            </Route>
                            <Route
                                path='/projects'
                                permission={permissions.accessProjects}>
                                <Projects />
                            </Route>
                            <Route
                                path='/reports'
                                permission={permissions.accessReports}>
                                <Reports />
                            </Route>
                            <Route
                                path='/admin'
                                permission={permissions.accessAdmin}>
                                <Admin />
                            </Route>
                            <Route path='/'>
                                <Home />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        </AppContext.Provider >
    )
}