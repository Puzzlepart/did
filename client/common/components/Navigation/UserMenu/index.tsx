import { AppContext } from 'AppContext';
import resource from 'i18n';
import * as React from 'react';
import FadeIn from 'react-fade-in';
import styles from './UserMenu.module.scss';
import { UserSettings } from './UserSettings';

export const UserMenu = () => {
    const { user } = React.useContext(AppContext);
    const [showMenu, setShowMenu] = React.useState<boolean>(false);
    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <a className={styles.toggle} href='#'>
                    <span className={styles.toggle} onClick={() => setShowMenu(!showMenu)}>👨‍💼</span>
                </a>
                {showMenu && (
                    <FadeIn className={styles.menu}>
                        <div className={styles.userName}>{user.fullName}</div>
                        <div className={styles.userEmail}>{user.email}</div>
                        <div className={styles.userDetail}>{user.role}</div>
                        <div className={styles.userDetail}>{user.sub.name}</div>
                        <UserSettings />
                        <div className={styles.userDetail}>
                            <a href='/auth/signout' className={styles.userSignOut}>{resource('COMMON.LOG_OUT_TEXT')}</a>
                        </div>
                    </FadeIn>
                )}
            </div>
        </div>
    );
}