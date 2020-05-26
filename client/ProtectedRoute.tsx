import * as React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { contains } from 'underscore'
import { AppContext } from './AppContext'

export interface IProtectedRouteProps extends RouteProps {
    /**
     * Permission required for the route (optional)
     */
    permission?: string;
}

export const ProtectedRoute = ({ path, exact, permission, children }: IProtectedRouteProps) => {
    const { user } = React.useContext(AppContext)
    const redirect = !!permission && !contains(user.role.permissions, permission)
    return (
        <Route exact={exact} path={path}>
            {redirect
                ? <Redirect to='/' />
                : children
            }
        </Route>
    )
}