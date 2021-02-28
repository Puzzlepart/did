import {PERMISSION} from 'config/security';
import React, {FunctionComponent} from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import {usePermissions} from './hooks';

export interface IProtectedRouteProps extends RouteProps {
	/**
	 * Permission required for the route (optional)
	 */
	permission?: PERMISSION;
}

export const ProtectedRoute: FunctionComponent<IProtectedRouteProps> = ({
	path,
	exact,
	permission,
	children
}: IProtectedRouteProps) => {
	const {hasPermission} = usePermissions();
	return (
		<Route exact={exact} path={path}>
			{!hasPermission(permission) ? <Redirect to="/" /> : children}
		</Route>
	);
};
