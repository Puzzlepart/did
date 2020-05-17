import * as React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { Projects } from './Projects'
export { GET_PROJECTS, ProjectList } from './Projects'

/**
 * @ignore
 */
const _ = () => {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route path={`${match.path}/:key`}>
                <Projects />
            </Route>
            <Route path={match.path}>
                <Projects />
            </Route>
        </Switch>
    )
}

export default _