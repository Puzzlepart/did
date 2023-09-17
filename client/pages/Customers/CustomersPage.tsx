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
    <Route path='/customers/:currentTab?/:detailsTab?' component={Customers} />
  </Switch>
)

CustomersPage.displayName = 'CustomersPage'
CustomersPage.iconName = 'People'
CustomersPage.permission = PermissionScope.ACCESS_CUSTOMERS
