import { AppContext } from 'AppContext'
import React,{useContext} from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.scss'
import { NavItem } from './NavItem'
import { UserMenu } from './UserMenu'
import { isMobile } from 'react-device-detect'
import * as permissions from 'config/security/permissions'
import { UserNotifications } from './UserNotifications'

export const Navigation = () => {
    const { t } = useTranslation()
    const { user } = useContext(AppContext)
    let className = styles.root
    if (isMobile) className += ` ${styles.mobile}`
    return (
        <nav className={className}>
            <div className={styles.container}>
                <Link to='/' className={styles.logo} title='Did - The Calendar is the Timesheet'>did</Link>
                <ul className={styles.nav} hidden={!user}>
                    <NavItem
                        text={t('navigation.timesheet')}
                        iconName='TimeSheet'
                        to='/timesheet' 
                        permission={permissions.accessTimesheet} />
                    <NavItem
                        text={t('navigation.customers')}
                        iconName='People'
                        to='/customers'
                        permission={permissions.accessCustomers} />
                    <NavItem
                        text={t('navigation.projects')}
                        iconName='ProjectCollection'
                        to='/projects'
                        permission={permissions.accessProjects} />
                    <NavItem
                        text={t('navigation.reports')}
                        iconName='ReportDocument'
                        to='/reports'
                        permission={permissions.accessReports} />
                    <NavItem
                        text={t('navigation.admin')}
                        iconName='Settings'
                        to='/admin'
                        permission={permissions.accessAdmin} />
                </ul>
                <ul className={styles.navRight}>
                    {!!user.subscription && <UserNotifications />}
                    <UserMenu />
                </ul>
            </div>
        </nav>
    )
}