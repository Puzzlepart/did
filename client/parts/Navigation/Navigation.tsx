import { mergeClasses } from '@fluentui/react-components'
import { useTheme } from '@fluentui/react/lib/Theme'
import { useAppContext } from 'AppContext'
import packageFile from 'package'
import { UserNotificationsContext } from 'parts/UserNotifications/context'
import { useUserNotifications } from 'parts/UserNotifications/useUserNotifications'
import React from 'react'
import { BrowserView, isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'
import { StyledComponent } from 'types'
import { UserFeedback } from '../UserFeedback'
import { UserMenu } from '../UserMenu'
import { UserNotifications } from '../UserNotifications'
import styles from './Navigation.module.scss'
import { NavItem } from './NavItem'

/**
 * @category Function Component
 */
export const Navigation: StyledComponent = () => {
  const { pages, isAuthenticated } = useAppContext()
  const theme = useTheme()
  const userNotificationsContextValue = useUserNotifications()
  if (!isAuthenticated) return null
  return (
    <UserNotificationsContext.Provider value={userNotificationsContextValue}>
      <nav
        className={mergeClasses(
          Navigation.className,
          isMobile && styles.mobile
        )}
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
                text={page.text}
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

Navigation.displayName = 'Navigation'
Navigation.className = styles.navigation
