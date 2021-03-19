/* eslint-disable tsdoc/syntax */
import { AppContext } from 'AppContext'
import { usePages } from 'pages/usePages'
import React, { FunctionComponent, useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.scss'
import { NavItem } from './NavItem'
import { UserMenu } from './UserMenu'
import { UserNotifications } from './UserNotifications'

/**
 * @category Function Component
 */
export const Navigation: FunctionComponent = () => {
  const { nav } = usePages()
  const { user } = useContext(AppContext)
  let className = styles.root
  if (isMobile) className += ` ${styles.mobile}`
  return (
    <nav className={className}>
      <div className={styles.container}>
        <Link
          to='/'
          className={styles.logo}
          title='did - The Calendar is the Timesheet'>
          did
        </Link>
        <ul className={styles.nav} hidden={!user}>
          {nav.map(
            (props, index) =>
              !props.hidden && <NavItem key={index} {...props} />
          )}
        </ul>
        <ul className={styles.navRight}>
          {!!user.id && <UserNotifications />}
          <UserMenu />
        </ul>
      </div>
    </nav>
  )
}

export * from './NavItem'
