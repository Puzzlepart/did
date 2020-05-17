import * as React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { Reports } from './Reports'

/**
 * @ignore
 */
const _ = () => {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route path={match.path}>
                <Reports />
            </Route>
        </Switch>
    )
}

export default _