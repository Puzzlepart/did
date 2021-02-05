import * as React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { Customers } from './Customers'

export default () => {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route path={`${match.path}/:view/:key`}>
        <Customers />
      </Route>
      <Route path={`${match.path}/:view`}>
        <Customers />
      </Route>
      <Route path={match.path}>
        <Customers />
      </Route>
    </Switch>
  )
}
