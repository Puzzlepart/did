/* eslint-disable tsdoc/syntax */
import { AppContext } from 'AppContext'
import { PERMISSION } from 'config/security/permissions'
import React, { FunctionComponent, useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.scss'
import { NavItem } from './NavItem'
import { UserMenu } from './UserMenu'
import { UserNotifications } from './UserNotifications'

/**
 * @category Function Component
 */
export const Navigation: FunctionComponent = () => {
  const { t } = useTranslation()
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
          <NavItem
            text={t('navigation.timesheet')}
            iconName='TimeSheet'
            to='/timesheet'
            permission={PERMISSION.ACCESS_TIMESHEET}
          />
          <NavItem
            text={t('navigation.customers')}
            iconName='People'
            to='/customers'
            permission={PERMISSION.ACCESS_CUSTOMERS}
          />
          <NavItem
            text={t('navigation.projects')}
            iconName='ProjectCollection'
            to='/projects'
            permission={PERMISSION.ACCESS_PROJECTS}
          />
          <NavItem
            text={t('navigation.reports')}
            iconName='ReportDocument'
            to='/reports'
            permission={PERMISSION.ACCESS_REPORTS}
          />
          <NavItem
            text={t('navigation.admin')}
            iconName='Settings'
            to='/admin'
            permission={PERMISSION.ACCESS_ADMIN}
          />
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
