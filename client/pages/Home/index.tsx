import React, { useContext } from 'react'
import styles from './Home.module.scss'
import { useTranslation } from 'react-i18next'
import { AppContext } from 'AppContext'
import { DefaultButton } from 'office-ui-fabric-react'

/**
 * @ignore
 */
export default () => {
    const { user } = useContext(AppContext)
    const { t } = useTranslation()
    return (
        <div className={styles.root}>
            <div className={styles.logo}>did</div>
            <p className={styles.motto}>The Calendar is the Timesheet</p>
            <DefaultButton
                className={styles.signinbutton}
                hidden={!!user.subscription}
                href='/auth/signin'
                text={t('common.signInText')}/>
        </div>
    )
}