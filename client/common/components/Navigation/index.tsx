import { AppContext } from 'AppContext';
import resource from 'i18n';
import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserMenu } from './UserMenu';
import styles from './Navigation.module.scss';

export const Navigation = () => {
    const { user } = React.useContext(AppContext);
    return (
        <nav className={styles.root}>
            <div className={styles.container}>
                <Link to='/' className={styles.logo}>
                    <img src='/images/D_beta_sm.png' />
                </Link>
                <ul className={styles.nav} hidden={!user}>
                    <li className={styles.navItem}>
                        <NavLink to='/timesheet' className={styles.navLink} activeClassName={styles.active}>{resource('NAVIGATION.TIMESHEET')}</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink to='/customers' className={styles.navLink} activeClassName={styles.active}>{resource('NAVIGATION.CUSTOMERS')}</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink to='/projects' className={styles.navLink} activeClassName={styles.active}>{resource('NAVIGATION.PROJECTS')}</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink to='/reports' className={styles.navLink} activeClassName={styles.active}>{resource('NAVIGATION.REPORTS')}</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink to='/admin' className={styles.navLink} activeClassName={styles.active}>{resource('NAVIGATION.ADMIN')}</NavLink>
                    </li>
                    {/* <button className={styles.hamburger} type='button'>
                        <span className={styles.icon}></span>
                    </button> */}
                </ul>
                    <UserMenu />
            </div>
        </nav>
    );
}