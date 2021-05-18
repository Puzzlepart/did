/* eslint-disable tsdoc/syntax */
import { useRouteMatches } from 'hooks/route/useRouteMatches'
import { PageComponent } from 'pages/types'
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
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
  const matches = useRouteMatches('view')
  return (
    <Switch>
      {matches.map((path) => (
        <Route key={path} path={path}>
          <Admin />
        </Route>
      ))}
    </Switch>
  )
}

Object.assign(AdminPage, {
  iconName: 'Settings',
  permission: PermissionScope.ACCESS_ADMIN
} as Partial<PageComponent>)

export * from './Admin'
