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
                        <div className={`${styles.menuItem} ${styles.userName}`}>{user.fullName}</div>
                        <div className={styles.menuItem}>{user.email}</div>
                        <div className={styles.menuItem}>{user.role} ({user.sub.name})</div>
                        <div className={styles.divider}></div>
                        <UserSettings className={styles.menuItem} />
                        <div className={styles.divider}></div>
                        <a href='/auth/signout' className={styles.menuItem}>{resource('COMMON.LOG_OUT_TEXT')}</a>
                    </FadeIn>
                )}
            </div>
        </div>
    );
}