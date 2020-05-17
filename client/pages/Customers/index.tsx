import * as React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { Customers } from './Customers'

/**
 * @ignore
 */
const _ = () => {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route path={`${match.path}/:key`}>
                <Customers />
            </Route>
            <Route path={match.path}>
                <Customers />
            </Route>
        </Switch>
    )
}

export default _