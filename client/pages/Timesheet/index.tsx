import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Timesheet } from './Timesheet';

/**
 * @ignore
 */
const _ = () => {
    const match = useRouteMatch();
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

_['displayName'] = 'Timesheet';

export default _;

export * from './TimesheetContext';

