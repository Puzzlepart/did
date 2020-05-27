import { Navigation } from 'components/Navigation'
import * as React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import styles from './App.module.scss'
import { AppContext, IAppContext } from './AppContext'
import { Admin, Customers, Home, Projects, Reports, Timesheet } from './pages'
import { ProtectedRoute as Route } from './ProtectedRoute'
import { accessReports, accessAdmin, accessCustomers, accessProjects } from 'config/security/permissions'


const App = (context: IAppContext): JSX.Element => {
    return (
        <AppContext.Provider value={context}>
            <Router>
                <div className={styles.root}>
                    <Navigation />
                    <div className={styles.container}>
                        <Switch>
                            <Route path='/timesheet'>
                                <Timesheet />
                            </Route>
                            <Route
                                path='/customers'
                                permission={accessCustomers}>
                                <Customers />
                            </Route>
                            <Route
                                path='/projects'
                                permission={accessProjects}>
                                <Projects />
                            </Route>
                            <Route
                                path='/reports'
                                permission={accessReports}>
                                <Reports />
                            </Route>
                            <Route
                                path='/admin'
                                permission={accessAdmin}>
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

export { App }

