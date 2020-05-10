import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { SummaryView } from './SummaryView';

export default () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={match.path}>
                <SummaryView />
            </Route>
        </Switch>
    );
}