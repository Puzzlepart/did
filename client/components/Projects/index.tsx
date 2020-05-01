import { Projects } from './Projects';
export { ProjectList, GET_PROJECTS } from './Projects';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import * as React from 'react';

export default () => {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:key`}>
                <Projects />
            </Route>
            <Route path={match.path}>
                <Projects />
            </Route>
        </Switch>
    );
}