/* eslint-disable tsdoc/syntax */
import { PageComponent } from 'pages/types'
import * as React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { PermissionScope } from 'security'
import { Customers } from './Customers'

/**
 * Customers page
 *
 * Using `Switch`, `Route` and `useRouteMatch` from
 * `react-router-dom` to support navigating between
 * sub components
 *
 * @category Page Component
 */
export const CustomersPage: PageComponent = () => {
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

Object.assign(CustomersPage, {
  iconName: 'AccountActivity',
  permission: PermissionScope.ACCESS_CUSTOMERS
} as Partial<PageComponent>)

export * from './Customers'
