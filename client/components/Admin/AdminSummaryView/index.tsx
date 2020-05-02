import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { AdminSummaryView } from './AdminSummaryView';

export default () => {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:year`}>
                <AdminSummaryView />
            </Route>
            <Route path={match.path}>
                <AdminSummaryView />
            </Route>
        </Switch>
    );
}