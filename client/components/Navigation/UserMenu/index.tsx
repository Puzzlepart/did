import { AppContext } from 'AppContext'
import { Callout, Target } from 'office-ui-fabric-react/lib/Callout'
import React, { useContext, useState } from 'react'
import FadeIn from 'react-fade-in'
import { useTranslation } from 'react-i18next'
import styles from './UserMenu.module.scss'
import { UserSettings } from './UserSettings'
import { Icon } from 'office-ui-fabric-react/lib/Icon'

export const UserMenu = () => {
    const { t } = useTranslation()
    const { user } = useContext(AppContext)
    const [menuTarget, setMenuTarget] = useState<Target>(null)

    if (!user.subscription) {
        return (
            <>
                <div
                    className={styles.root}
                    onClick={event => setMenuTarget(event.currentTarget)}>‍
                    <Icon iconName={'PlayerSettings'} className={styles.icon} />
                </div>

                {menuTarget && (
                    <Callout
                        hidden={!menuTarget}
                        target={menuTarget}
                        onDismiss={() => setMenuTarget(null)}
                        gapSpace={-8}>
                        <FadeIn className={styles.menu}>
                            <a href='/auth/signin' className={styles.menuItem}>{t('logInText')}</a>
                        </FadeIn>
                    </Callout>
                )}
            </>
        )
    }

    return (
        <>
            <div
                className={styles.root}
                onClick={event => setMenuTarget(event.currentTarget)}>‍
                    <Icon iconName={'PlayerSettings'} className={styles.icon} />
            </div>

            {menuTarget && (
                <Callout
                    hidden={!menuTarget}
                    target={menuTarget}
                    onDismiss={() => setMenuTarget(null)}
                    gapSpace={-8}>
                    <FadeIn className={styles.menu}>
                        <div className={`${styles.menuItem} ${styles.userName}`}>{user.displayName}</div>
                        <div className={styles.menuItem}>{user.mail}</div>
                        <div className={styles.menuItem}>
                            <span>{user.role?.name}</span>
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.menuItem}>
                            <span>{user.subscription?.name}</span>
                        </div>
                        <div className={styles.divider}></div>
                        <UserSettings className={styles.menuItem} />
                        <div className={styles.divider}></div>
                        <a href='/auth/signout' className={styles.menuItem}>{t('logOutText')}</a>
                    </FadeIn>
                </Callout>
            )}
        </>
    )
}