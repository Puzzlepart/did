import React, { useContext } from 'react'
import styles from './Home.module.scss'
import { useTranslation } from 'react-i18next'
import { AppContext } from 'AppContext'
import { DefaultButton } from 'office-ui-fabric-react'


export default () => {
    const { user } = useContext(AppContext)
    const { t } = useTranslation()
    return (
        <div className={styles.root}>
            <div className={styles.logo}>did</div>
            <p className={styles.motto}>{t('common.motto')}</p>
            <div hidden={!!user.subscription}>
                <DefaultButton
                    className={styles.signinbutton}
                    href='/auth/signin'
                    text={t('common.signInText')} />
            </div>
        </div>
    )
}