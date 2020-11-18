import { AppContext } from 'AppContext'
import { UserMessage } from 'components'
import { DefaultButton, MessageBarType } from 'office-ui-fabric'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Home.module.scss'

export default (): React.ReactElement<HTMLDivElement> => {
  const { subscription } = useContext(AppContext)
  const { t } = useTranslation()
  const error = JSON.parse(document.getElementById('app').getAttribute('data-error') || null)

  return (
    <div className={styles.root}>
      <div className={styles.logo}>did</div>
      <p className={styles.motto}>{t('common.motto')}</p>
      {error && (
        <UserMessage
          className={styles.error}
          type={MessageBarType.error}
          iconName={error.icon}
          text={[`#### ${error.name} ####`, error.message].join('\n\n')}
        />
      )}
      <div hidden={!!subscription || !!error}>
        <DefaultButton
          className={styles.signinbutton}
          href='/auth/signin'
          text={t('common.signInText')}
        />
      </div>
    </div>
  )
}
