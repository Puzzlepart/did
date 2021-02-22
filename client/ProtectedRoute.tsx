import { PERMISSION } from 'config/security'
import React, { FunctionComponent, useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { AppContext } from './AppContext'

export interface IProtectedRouteProps extends RouteProps {
  /**
   * Permission required for the route (optional)
   */
  permission?: PERMISSION
}

export const ProtectedRoute: FunctionComponent<IProtectedRouteProps> = ({
  path,
  exact,
  permission,
  children
}: IProtectedRouteProps) => {
  const { user } = useContext(AppContext)
  const redirect = !user.hasPermission(permission)
  return (
    <Route exact={exact} path={path}>
      {redirect ? <Redirect to='/' /> : children}
    </Route>
  )
}
