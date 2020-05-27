import { AppContext } from 'AppContext'
import { accessAdmin, accessCustomers, accessProjects, accessReports } from 'config/security/permissions'
import * as React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.scss'
import { NavItem } from './NavItem'
import { UserMenu } from './UserMenu'
import { UserNotifications } from './UserNotifications'

export const Navigation = () => {
    const { t } = useTranslation('navigation')
    const { user,theme } = React.useContext(AppContext)
    let className = styles.root
    if (isMobile) className += ` ${styles.mobile}`
    return (
        <nav className={className}
            style={{ backgroundColor: theme.palette.black }} >
            <div className={styles.container}>
                <Link to='/' className={styles.logo} title='Did 365 - The Calendar is the Timesheet'>
                    <img src='/images/D_beta_sm.png' />
                </Link>
                <ul className={styles.nav} hidden={!user}>
                    <NavItem
                        text={t('timesheet')}
                        iconName='TimeSheet'
                        to='/timesheet' />
                    <NavItem
                        text={t('customers')}
                        iconName='People'
                        to='/customers'
                        permission={accessCustomers} />
                    <NavItem
                        text={t('projects')}
                        iconName='ProjectCollection'
                        to='/projects'
                        permission={accessProjects} />
                    <NavItem
                        text={t('reports')}
                        iconName='ReportDocument'
                        to='/reports'
                        permission={accessReports} />
                    <NavItem
                        text={t('admin')}
                        iconName='Settings'
                        to='/admin'
                        permission={accessAdmin} />
                </ul>
                <ul className={styles.navRight}>
                    <UserNotifications />
                    <UserMenu />
                </ul>
            </div>
        </nav>
    )
}