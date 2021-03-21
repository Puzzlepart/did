/* eslint-disable tsdoc/syntax */
import * as React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { Reports } from './Reports'

/**
 * @ignore
 */
export const ReportsPage = () => {
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

export * from './context'
export * from './hooks'
export * from './reducer'
export * from './ReportsList/commandBar'
export * from './SaveFilterForm'
export * from './types'
