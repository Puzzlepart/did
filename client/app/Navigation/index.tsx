/* eslint-disable tsdoc/syntax */
import { useAppContext } from 'AppContext'
import { description, name } from 'package'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'
import { useAppClassName } from '../useAppClassName'
import styles from './Navigation.module.scss'
import { NavItem } from './NavItem'
import { UserFeedback } from './UserFeedback'
import { UserMenu } from './UserMenu'
import { UserNotifications } from './UserNotifications'

/**
 * @category Function Component
 */
export const Navigation: React.FC = () => {
  const { pages, isAuthenticated } = useAppContext()
  const className = useAppClassName(styles)
  return (
    <nav className={className} hidden={isMobile && !isAuthenticated}>
      <div className={styles.container}>
        <Link to='/' className={styles.logo} title={`${name} - ${description}`}>
          {name}
        </Link>
        <ul className={styles.nav} hidden={!isAuthenticated}>
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
        <ul className={styles.navRight} hidden={!isAuthenticated}>
          <span hidden={isMobile}>
            <UserFeedback />
            <UserNotifications />
          </span>
          <UserMenu />
        </ul>
      </div>
    </nav>
  )
}

export * from './NavItem'
