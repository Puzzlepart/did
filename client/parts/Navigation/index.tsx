/* eslint-disable tsdoc/syntax */
import { useTheme } from '@fluentui/react/lib/Theme'
import { useAppContext } from 'AppContext'
import packageFile from 'package'
import { UserNotificationsContext } from 'parts/UserNotifications/context'
import { useUserNotifications } from 'parts/UserNotifications/useUserNotifications'
import React, { FC } from 'react'
import { BrowserView, isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'
import { useAppClassName } from '../../app/useAppClassName'
import { UserFeedback } from '../UserFeedback'
import { UserMenu } from '../UserMenu'
import { UserNotifications } from '../UserNotifications'
import styles from './Navigation.module.scss'
import { NavItem } from './NavItem'

/**
 * @category Function Component
 */
export const Navigation: FC = () => {
  const { pages, isAuthenticated } = useAppContext()
  const className = useAppClassName(styles)
  const theme = useTheme()
  const userNotificationsContextValue = useUserNotifications()
  if (!isAuthenticated) return null
  return (
    <UserNotificationsContext.Provider value={userNotificationsContextValue}>
      <nav
        className={className}
        style={{ background: theme.semanticColors.menuHeader }}
        hidden={isMobile && !isAuthenticated}
      >
        <div className={styles.container}>
          <Link
            to={{ pathname: '/', state: { prevPath: location.pathname } }}
            className={styles.logo}
            title={`${packageFile.name} - ${packageFile.description}`}
          >
            {packageFile.name}
          </Link>
          <ul className={styles.nav}>
            {pages.map((page, index) => (
              <NavItem
                key={index}
                text={page.displayName}
                iconName={page.iconName}
                to={{
                  pathname: page.path,
                  state: { prevPath: location.pathname }
                }}
                permission={page.permission}
              />
            ))}
          </ul>
          <ul className={styles.navRight}>
            <BrowserView renderWithFragment={true}>
              <UserFeedback />
              <UserNotifications />
            </BrowserView>
            <UserMenu />
          </ul>
        </div>
      </nav>
    </UserNotificationsContext.Provider>
  )
}

export * from './NavItem'
