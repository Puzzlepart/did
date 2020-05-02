import { Reports } from './Reports';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import * as React from 'react';

/**
 * @ignore
 */
const _ = () => {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={match.path}>
                <Reports />
            </Route>
        </Switch>
    );
}

_['displayName'] = 'Reports';

export default _;