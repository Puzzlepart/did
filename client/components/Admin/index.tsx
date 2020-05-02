import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Admin } from './Admin';

export default () => {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:view/:year`}>
                <Admin />
            </Route>
            <Route path={`${match.path}/:view`}>
                <Admin />
            </Route>
            <Route path={match.path}>
                <Admin />
            </Route>
        </Switch>
    );
}