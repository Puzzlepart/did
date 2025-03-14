import { useAppContext } from 'AppContext'
import { usePermissions } from 'hooks'
import React, { FC, useEffect } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { MobileBreadcrumb } from '../parts'
import styles from './App.module.scss'
import { RESET_BREADCRUMB } from './reducer'

export const AppSwitch: FC = () => {
  const location = useLocation()
  const { pages, dispatch } = useAppContext()
  const [, hasPermission] = usePermissions()
  const page = location?.pathname.split('/')[1]

  useEffect(() => dispatch(RESET_BREADCRUMB()), [page])

  return (
    <Switch>
      {pages.map((Page, index) => (
        <Route key={index} path={Page.path}>
          {hasPermission(Page.permission) ? (
            <>
              <MobileBreadcrumb page={Page} hidden={Page.path === '/'} />
              <div className={styles.container}>
                <Page />
              </div>
            </>
          ) : (
            <Redirect to='/' />
          )}
        </Route>
      ))}
    </Switch>
  )
}

AppSwitch.displayName = 'AppSwitch'
