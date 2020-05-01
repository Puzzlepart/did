import { AdminView } from 'components/AdminView';
import Customers from 'components/Customers';
import { Home } from 'components/Home';
import { Navigation } from 'components/Navigation';
import Projects from 'components/Projects';
import { Reports } from 'components/Reports';
import { Timesheet } from 'components/Timesheet';
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export interface IAppContext {
    user: any;
}

const App = (context: IAppContext) => {
    return (
        <Router>
            <div>
                <Navigation {...context} />
                <Switch>
                    <Route exact path='/timesheet'>
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
                    <Route exact path='/admin'>
                        <AdminView />
                    </Route>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export { App };

