import * as React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { contains } from 'underscore'
import { AppContext } from './AppContext'

export interface IProtectedRouteProps extends RouteProps {
    permissionId: string;
}

export const ProtectedRoute = ({ path, exact, permissionId, children }: IProtectedRouteProps) => {
    const { user } = React.useContext(AppContext)
    return (
        <Route exact={exact} path={path}>
            {contains(user.role.permissions, permissionId)
                ? children
                : <Redirect to='/' />}
        </Route>
    )
}