/* eslint-disable tsdoc/syntax */
import { PageComponent } from 'pages/types'
import * as React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
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
  const match = useRouteMatch()
  return (
    <Switch>
      <Route path={`${match.path}/:query`}>
        <Reports />
      </Route>
      <Route path={match.path}>
        <Reports />
      </Route>
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
export * from './ReportsList/commandBar'
export * from './SaveFilterForm'
export * from './types'
