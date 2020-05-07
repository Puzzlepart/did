import { Navigation } from 'common/components/Navigation';
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppContext, IAppContext } from './AppContext';
import { Admin, Customers, Home, Projects, Reports, Timesheet } from './pages';
import styles from './App.module.scss';

const App = (context: IAppContext): JSX.Element => {
    return (
        <AppContext.Provider value={context}>
            <Router>
                <div>
                    <Navigation />
                    <div className={styles.root}>
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
                            <Route exact path='/reports'>
                                <Reports />
                            </Route>
                            <Route path='/admin'>
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

export { App };

