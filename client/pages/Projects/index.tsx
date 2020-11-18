import * as React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { Projects } from './Projects'
export { ProjectList } from './Projects'

const _ = (): React.ReactElement<Switch> => {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route path={`${match.path}/:view/:key/:detailsTab`}>
        <Projects />
      </Route>
      <Route path={`${match.path}/:view/:key`}>
        <Projects />
      </Route>
      <Route path={`${match.path}/:view`}>
        <Projects />
      </Route>
      <Route path={match.path}>
        <Projects />
      </Route>
    </Switch>
  )
}

export default _
