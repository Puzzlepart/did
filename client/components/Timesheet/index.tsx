import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Timesheet } from './Timesheet';

export default () => {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:view/:startDateTime`}>
                <Timesheet />
            </Route>
            <Route path={`${match.path}/:startDateTime`}>
                <Timesheet />
            </Route>
            <Route path={match.path}>
                <Timesheet />
            </Route>
        </Switch>
    );
}

export * from './TimesheetContext';