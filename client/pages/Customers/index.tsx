/* eslint-disable tsdoc/syntax */
import { useRouteMatches } from 'hooks/route/useRouteMatches'
import { PageComponent } from 'pages/types'
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
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
  const matches = useRouteMatches('view', 'key')
  return (
    <Switch>
      {matches.map((path) => (
        <Route key={path} path={path}>
          <Customers />
        </Route>
      ))}
    </Switch>
  )
}

Object.assign(CustomersPage, {
  iconName: 'People',
  permission: PermissionScope.ACCESS_CUSTOMERS
} as Partial<PageComponent>)

export * from './Customers'
