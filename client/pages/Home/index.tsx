import * as React from 'react'
import styles from './Home.module.scss'
import { useTranslation } from 'react-i18next'
import { AppContext } from 'AppContext'

/**
 * @ignore
 */
export default () => {
    const { user } = React.useContext(AppContext)
    const { t } = useTranslation()
    return (
        <div className={styles.root}>
            <div className={styles.logo}>did</div>
            <p className={styles.motto}>The Calendar is the Timesheet</p>
            {!user.subscription && (<a className={styles.signinbutton} href='/auth/signin'>{t('common.signInText')}</a>)}
        </div>
    )
}