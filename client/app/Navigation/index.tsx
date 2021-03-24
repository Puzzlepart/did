/* eslint-disable tsdoc/syntax */
import { useAppContext } from 'AppContext'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'
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
  let className = styles.root
  if (isMobile) className += ` ${styles.mobile}`
  return (
    <nav className={className} hidden={isMobile && !isAuthenticated}>
      <div className={styles.container}>
        <Link
          to='/'
          className={styles.logo}
          title='did - The Calendar is the Timesheet'>
          did
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
        <ul className={styles.navRight}>
          {isAuthenticated && <UserFeedback />}
          {isAuthenticated && <UserNotifications />}
          <UserMenu />
        </ul>
      </div>
    </nav>
  )
}

export * from './NavItem'
