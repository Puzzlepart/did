import * as React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {Reports} from './Reports';

/**
 * @ignore
 */
export const ReportsPage = () => {
	const match = useRouteMatch();
	return (
		<Switch>
			<Route path={`${match.path}/:query`}>
				<Reports />
			</Route>
			<Route path={match.path}>
				<Reports />
			</Route>
		</Switch>
	);
};

export * from './types';
export * from './hooks';
export * from './context';
export * from './reducer';
export * from './SaveFilterForm';
export * from './columns';
export * from './commandBar';
export * from './queries';
