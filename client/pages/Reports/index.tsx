import * as React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { Reports } from './Reports'

export default () => {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route path={`${match.path}/:query`}>
                <Reports />
            </Route>
            <Route path={match.path}>
                <Reports />
            </Route>
        </Switch>
    )
}
