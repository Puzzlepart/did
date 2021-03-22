/* eslint-disable tsdoc/syntax */
import { PageComponent } from 'pages/types'
import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { PermissionScope } from 'security'
import { Timesheet } from './Timesheet'

/**
 * Timesheet page
 *
 * Using `Switch`, `Route` and `useRouteMatch` from
 * `react-router-dom` to support navigating between
 * sub components
 *
 * @category Page Component
 */
export const TimesheetPage: PageComponent = () => {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route path={`${match.path}/:view/:week/:month/:year`}>
        <Timesheet />
      </Route>
      <Route path={match.path}>
        <Timesheet />
      </Route>
    </Switch>
  )
}

Object.assign(TimesheetPage, {
  iconName: 'TimeSheet',
  permission: PermissionScope.ACCESS_TIMESHEET
} as Partial<PageComponent>)

export * from './hooks'
export * from './Timesheet'
export * from './TimesheetPeriod'
export * from './TimesheetScope'
export * from './types'
