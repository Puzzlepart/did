import { AppContext } from 'AppContext'
import { Callout, Target } from 'office-ui-fabric-react/lib/Callout'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import React, { useContext, useState } from 'react'
import { isMobile } from 'react-device-detect'
import FadeIn from 'react-fade-in'
import { useTranslation } from 'react-i18next'
import { Divider } from './Divider'
import { ExportHours } from './ExportHours'
import styles from './UserMenu.module.scss'
import { UserSettings } from './UserSettings'

export const UserMenu = () => {
    const { t } = useTranslation()
    const { user } = useContext(AppContext)
    const [menuTarget, setMenuTarget] = useState<Target>(null)

    if (!user.subscription) return null

    return (
        <>
            <a
                className={styles.root}
                onClick={event => setMenuTarget(event.currentTarget)}>‍
                    <Icon iconName={'PlayerSettings'} className={styles.icon} />
            </a>

            {menuTarget && (
                <Callout
                    hidden={!menuTarget}
                    target={menuTarget}
                    onDismiss={() => setMenuTarget(null)}
                    gapSpace={-8}>
                    <FadeIn className={styles.menu}>
                        <div className={`${styles.menuItem} ${styles.userName}`}>
                            {user.displayName} | <span className={styles.role}>{user.role?.name}</span>
                        </div>
                        <div className={`${styles.menuItem} ${styles.mail}`}>
                            {user.mail}
                        </div>
                        <Divider />
                        <div className={styles.menuItem}>
                            <Icon iconName='Home' className={styles.icon} />
                            <span>{user.subscription?.name}</span>
                        </div>
                        <span hidden={isMobile}>
                            <Divider />
                            <ExportHours />
                        </span>
                        <Divider />
                        <UserSettings className={styles.menuItem} />
                        <Divider />
                        <a href='/auth/signout' className={styles.menuItem}>
                            <Icon iconName='SignOut' className={styles.icon} />{t('common.signOutText')}
                        </a>
                    </FadeIn>
                </Callout>
            )}
        </>
    )
}