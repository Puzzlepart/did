import { AppContext } from 'AppContext';
import resource from 'i18n';
import * as React from 'react';
import styles from './UserMenu.module.scss';
import { UserSettings } from './UserSettings';

export const UserMenu = () => {
    const { user } = React.useContext(AppContext);

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <a className={styles.toggle} href='#'>
                    <span className={styles.toggle}>👨‍💼</span>
                </a>
                <div className={styles.menu}>
                    <div className={styles.userName}>{user.fullName}</div>
                    <div className={styles.userEmail}>{user.email}</div>
                    <div className={styles.userDetail}>{user.role}</div>
                    <div className={styles.userDetail}>{user.sub.name}</div>
                    <UserSettings />
                    <div className={styles.userDetail}>
                        <a href='/auth/signout' className={styles.userSignOut}>{resource('COMMON.LOG_OUT_TEXT')}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}