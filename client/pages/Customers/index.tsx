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
export const CustomersPage: PageComponent = () => (
  <Switch>
    <Route path='/customers/:currentTab?/:customerKey?' component={Customers} />
  </Switch>
)

Object.assign(CustomersPage, {
  iconName: 'People',
  permission: PermissionScope.ACCESS_CUSTOMERS
} as Partial<PageComponent>)

export * from './Customers'
