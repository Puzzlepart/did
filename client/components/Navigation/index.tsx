import { AppContext } from 'AppContext'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.scss'
import { NavItem } from './NavItem'
import { UserMenu } from './UserMenu'

export const Navigation = () => {
    const { t } = useTranslation('navigation')
    const { user } = React.useContext(AppContext)
    return (
        <nav className={styles.root}>
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
                        to='/customers' />
                    <NavItem
                        text={t('projects')}
                        iconName='ProjectCollection'
                        to='/projects' />
                    <NavItem
                        text={t('reports')}
                        iconName='ReportDocument'
                        to='/reports'
                        permissionId='a031c42f' />
                    <NavItem
                        text={t('admin')}
                        iconName='Settings'
                        to='/admin'
                        permissionId='2653c3aa' />
                </ul>
                <UserMenu />
            </div>
        </nav>
    )
}