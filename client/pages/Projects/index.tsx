import { PageComponent } from 'pages/types'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PermissionScope } from 'security'
import { Projects } from './Projects'

/**
 * Projects page
 *
 * Using `Switch`, `Route` and `useRouteMatch` from
 * [react-router-dom](https://www.npmjs.com/package/react-router-dom)
 * to support navigating between
 * sub components
 *
 * @category Page Component
 */
export const ProjectsPage: PageComponent = () => {
  return (
    <Switch>
      <Route path='/projects/:currentTab?/:projectKey?' component={Projects} />
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
