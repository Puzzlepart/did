import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Customers } from './Customers';

/**
 * @category Customers
 */
export default () => {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:key`}>
                <Customers />
            </Route>
            <Route path={match.path}>
                <Customers />
            </Route>
        </Switch>
    );
}