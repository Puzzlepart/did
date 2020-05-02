import Admin from 'components/Admin';
import Customers from 'components/Customers';
import { Home } from 'components/Home';
import { Navigation } from 'components/Navigation';
import Projects from 'components/Projects';
import { Reports } from 'components/Reports';
import Timesheet from 'components/Timesheet';
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppContext, IAppContext } from './AppContext';

const App = (context: IAppContext) => {
    return (
        <AppContext.Provider value={context}>
            <Router>
                <div>
                    <Navigation />
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
            </Router>
        </AppContext.Provider>
    )
}

export { App };

