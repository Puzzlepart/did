import { AppContext } from 'AppContext'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import styles from './Navigation.module.scss'
import { UserMenu } from './UserMenu'
import { Icon } from 'office-ui-fabric-react/lib/Icon'


export const Navigation = () => {
    const { t } = useTranslation('navigation')
    const { user } = React.useContext(AppContext)
    const navLinkProps = { className: styles.navLink, activeClassName: styles.active }
    return (
        <nav className={styles.root}>
            <div className={styles.container}>
                <Link to='/' className={styles.logo} title='Did 365 - The Calendar is the Timesheet'>
                    <img src='/images/D_beta_sm.png' />
                </Link>
                <ul className={styles.nav} hidden={!user}>
                    <li className={styles.navItem}>
                        <NavLink to='/timesheet' {...navLinkProps}>
                            <Icon iconName={'TimeSheet'} className={styles.navIcon} />
                            <span className={styles.navText}>
                                {t('timesheet')}
                            </span>
                        </NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink to='/customers' {...navLinkProps}>
                            <Icon iconName={'People'} className={styles.navIcon} />
                            <span className={styles.navText}>
                                {t('customers')}
                            </span>
                        </NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink to='/projects' {...navLinkProps}>
                            <Icon iconName={'ProjectCollection'} className={styles.navIcon} />
                            <span className={styles.navText}>
                                {t('projects')}
                            </span>
                        </NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink to='/reports' {...navLinkProps}>
                            <Icon iconName={'ReportDocument'} className={styles.navIcon} />
                            <span className={styles.navText}>
                                {t('reports')}
                            </span>
                        </NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink to='/admin' {...navLinkProps}>
                            <Icon iconName={'Settings'} className={styles.navIcon} />
                            <span className={styles.navText}>
                                {t('admin')}
                            </span>
                        </NavLink>
                    </li>
                </ul>
                <UserMenu />
            </div>
        </nav>
    )
}