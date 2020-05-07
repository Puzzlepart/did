import { AppContext } from 'AppContext';
import resource from 'i18n';
import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { UserMenu } from './UserMenu';

export const Navigation = () => {
    const { user } = React.useContext(AppContext);
    const navLinkProps = { className: styles.navLink, activeClassName: styles.active };
    return (
        <nav className={styles.root}>
            <div className={styles.container}>
                <Link to='/' className={styles.logo} title='Did 365 - The Calendar is the Timesheet'>
                    <img src='/images/D_beta_sm.png' />
                </Link>
                <ul className={styles.nav} hidden={!user}>
                    <li className={styles.navItem}>
                        <NavLink to='/timesheet' {...navLinkProps}>{resource('NAVIGATION.TIMESHEET')}</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink to='/customers' {...navLinkProps}>{resource('NAVIGATION.CUSTOMERS')}</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink to='/projects' {...navLinkProps}>{resource('NAVIGATION.PROJECTS')}</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink to='/reports' {...navLinkProps}>{resource('NAVIGATION.REPORTS')}</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink to='/admin' {...navLinkProps}>{resource('NAVIGATION.ADMIN')}</NavLink>
                    </li>
                </ul>
                <UserMenu />
            </div>
        </nav>
    );
}