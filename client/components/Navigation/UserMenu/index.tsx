import { AppContext } from 'AppContext'
import { Callout, Target } from 'office-ui-fabric-react/lib/Callout'
import * as React from 'react'
import FadeIn from 'react-fade-in'
import { useTranslation } from 'react-i18next'
import styles from './UserMenu.module.scss'
import { UserSettings } from './UserSettings'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { getTheme } from 'office-ui-fabric-react/lib/Styling'

export const UserMenu = () => {
    const theme = getTheme()
    const { t } = useTranslation('common')
    const { user } = React.useContext(AppContext)
    const [menuTarget, setMenuTarget] = React.useState<Target>(null)

    return (
        <>
            <div
                className={styles.root}
                onClick={event => setMenuTarget(event.currentTarget)}>‍
                    <Icon iconName={'PlayerSettings'} className={styles.icon} style={{ color: theme.palette.white }} />
            </div>

            {menuTarget && (
                <Callout
                    hidden={!menuTarget}
                    target={menuTarget}
                    onDismiss={() => setMenuTarget(null)}
                    gapSpace={-8}>
                    <FadeIn className={styles.menu}>
                        <div className={`${styles.menuItem} ${styles.userName}`}>{user.fullName}</div>
                        <div className={styles.menuItem}>{user.email}</div>
                        <div className={styles.menuItem}>{user.role.name} ({user.sub.name})</div>
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