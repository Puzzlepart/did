import * as React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {Projects} from './Projects';

/**
 * @ignore
 */
export const ProjectsPage = () => {
	const match = useRouteMatch();
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
	);
};

export * from './Projects';
export * from './ProjectDetails';
export * from './ProjectForm';
export * from './ProjectList';
export * from './types';
export * from './context';
