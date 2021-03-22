/* eslint-disable tsdoc/syntax */
import { PageComponent } from 'pages/types'
import * as React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { PermissionScope } from 'security'
import { Admin } from './Admin'

/**
 * Admin page
 *
 * Using `Switch`, `Route` and `useRouteMatch` from
 * `react-router-dom` to support navigating between
 * sub components
 *
 * @category Page Component
 */
export const AdminPage: PageComponent = () => {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route path={`${match.path}/:view/:year`}>
        <Admin />
      </Route>
      <Route path={`${match.path}/:view`}>
        <Admin />
      </Route>
      <Route path={match.path}>
        <Admin />
      </Route>
    </Switch>
  )
}

Object.assign(AdminPage, {
  iconName: 'Settings',
  permission: PermissionScope.ACCESS_ADMIN
} as Partial<PageComponent>)

export * from './Admin'
