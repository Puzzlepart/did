import React, { useContext } from 'react'
import styles from './Home.module.scss'
import { useTranslation } from 'react-i18next'
import { AppContext } from 'AppContext'
import { DefaultButton } from 'office-ui-fabric'
import { Icon } from 'office-ui-fabric'
import ReactMarkdown from 'react-markdown/with-html'


export default (): React.ReactElement<HTMLDivElement> => {
    const { subscription, error } = useContext(AppContext)
    const { t } = useTranslation()
    return (
        <div className={styles.root}>
            <div className={styles.logo}>did</div>
            <p className={styles.motto}>{t('common.motto')}</p>
            <div className={styles.error} hidden={!error.message}>
                <Icon className={styles.icon} iconName='Sad' />
                <strong className={styles.title}>{error.name}</strong>
                <ReactMarkdown className={styles.text} source={error.message} escapeHtml={false} />
            </div>
            <div hidden={!!subscription || !!error?.message}>
                <DefaultButton
                    className={styles.signinbutton}
                    href='/auth/signin'
                    text={t('common.signInText')} />
            </div>
        </div>
    )
}