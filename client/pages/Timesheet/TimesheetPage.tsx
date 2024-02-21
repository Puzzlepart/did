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
      <Route path={`${match.path}/:dateRange?/:view?/:startDate?`}>
        <Timesheet />
      </Route>
    </Switch>
  )
}

TimesheetPage.displayName = 'TimesheetPage'
TimesheetPage.iconName = 'Timer'
TimesheetPage.permission = PermissionScope.ACCESS_TIMESHEET
