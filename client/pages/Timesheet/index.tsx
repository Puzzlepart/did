/* eslint-disable tsdoc/syntax */
import { PageComponent } from 'pages/types'
import * as React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { PermissionScope } from 'security'
import { Timesheet } from './Timesheet'

/**
 * @ignore
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
