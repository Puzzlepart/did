import { useRouteMatches } from 'hooks/route/useRouteMatches'
import { PageComponent } from 'pages/types'
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PermissionScope } from 'security'
import { Reports } from './Reports'

/**
 * Reports page
 *
 * Using `Switch`, `Route` and `useRouteMatch` from
 * `react-router-dom` to support navigating between
 * sub components
 *
 * @category Page Component
 */
export const ReportsPage: PageComponent = () => {
  const matches = useRouteMatches('query')
  return (
    <Switch>
      {matches.map((path) => (
        <Route key={path} path={path}>
          <Reports />
        </Route>
      ))}
    </Switch>
  )
}

Object.assign(ReportsPage, {
  iconName: 'ReportDocument',
  permission: PermissionScope.ACCESS_REPORTS
} as Partial<PageComponent>)

export * from './context'
export * from './hooks'
export * from './reducer'
export * from './ReportsList/useCommands'
export * from './SaveFilterForm'
export * from './types'
