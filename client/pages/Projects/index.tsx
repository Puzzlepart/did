/* eslint-disable tsdoc/syntax */
import { PageComponent } from 'pages/types'
import * as React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { PermissionScope } from 'security'
import { Projects } from './Projects'

/**
 * Projects page
 *
 * Using `Switch`, `Route` and `useRouteMatch` from
 * `react-router-dom` to support navigating between
 * sub components
 *
 * @category Page Component
 */
export const ProjectsPage: PageComponent = () => {
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

Object.assign(ProjectsPage, {
  iconName: 'ProjectCollection',
  permission: PermissionScope.ACCESS_PROJECTS
} as Partial<PageComponent>)

export * from './context'
export * from './ProjectDetails'
export * from './ProjectForm'
export * from './ProjectList'
export * from './Projects'
export * from './types'
