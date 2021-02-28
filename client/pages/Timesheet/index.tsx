/* eslint-disable tsdoc/syntax */
import * as React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { Timesheet } from './Timesheet'

/**
 * @ignore
 */
export const TimesheetPage = () => {
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

export * from './hooks'
export * from './Timesheet'
export * from './TimesheetPeriod'
export * from './TimesheetScope'
export * from './types'
