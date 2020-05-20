import { Navigation } from 'components/Navigation'
import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styles from './App.module.scss'
import { AppContext, IAppContext } from './AppContext'
import { Admin, Customers, Home, Projects, Reports, Timesheet } from './pages'
import { ProtectedRoute } from './ProtectedRoute'


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
                            <Route path='/customers'>
                                <Customers />
                            </Route>
                            <Route path='/projects'>
                                <Projects />
                            </Route>
                            <ProtectedRoute
                                path='/reports'
                                permissionId='a031c42f-adcd-4314-bede-60ab7de2195c'>
                                <Reports />
                            </ProtectedRoute>
                            <ProtectedRoute
                                path='/admin'
                                permissionId='2653c3aa-e145-4a5d-a360-1e1f89e37597'>
                                <Admin />
                            </ProtectedRoute>
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

export { App }

