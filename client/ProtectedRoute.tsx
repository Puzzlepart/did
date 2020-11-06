import React, { useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { AppContext } from './AppContext'

export interface IProtectedRouteProps extends RouteProps {
    /**
     * Permission required for the route (optional)
     */
    permissionId?: string;
}

export const ProtectedRoute: React.FunctionComponent<IProtectedRouteProps> = ({ path, exact, permissionId, children }: IProtectedRouteProps) => {
    const { user } = useContext(AppContext)
    const redirect = !user.hasPermission(permissionId)
    return (
        <Route exact={exact} path={path}>
            {redirect
                ? <Redirect to='/' />
                : children
            }
        </Route>
    )
}