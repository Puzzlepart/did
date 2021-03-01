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

export * from './columns'
export * from './commandBar'
export * from './context'
export * from './hooks'
export * from './hooks/query-presets'
export * from './reducer'
export * from './SaveFilterForm'
export * from './types'
