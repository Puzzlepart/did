/* eslint-disable tsdoc/syntax */
import { useTheme } from '@fluentui/react/lib/Theme'
import { useAppContext } from 'AppContext'
import __package from 'package'
import React from 'react'
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
export const Navigation: React.FC = () => {
  const { pages, isAuthenticated } = useAppContext()
  const className = useAppClassName(styles)
  const theme = useTheme()
  if (!isAuthenticated) return null
  return (
    <nav
      className={className}
      style={{ background: theme.semanticColors.menuHeader }}
      hidden={isMobile && !isAuthenticated}>
      <div className={styles.container}>
        <Link
          to='/'
          className={styles.logo}
          title={`${__package.name} - ${__package.description}`}>
          {__package.name}
        </Link>
        <ul className={styles.nav}>
          {pages.map((page, index) => (
            <NavItem
              key={index}
              text={page.displayName}
              iconName={page.iconName}
              to={page.path}
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
  )
}

export * from './NavItem'
