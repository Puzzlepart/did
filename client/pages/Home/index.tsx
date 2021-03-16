/* eslint-disable tsdoc/syntax */
import { UserMessage } from 'components'
import { DefaultButton, MessageBarType } from 'office-ui-fabric-react'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Home.module.scss'
import { useHome } from './useHome'

/**
 * @category Function Component
 */
export const Home: FunctionComponent = () => {
  const { error, subscription } = useHome()
  const { t } = useTranslation()

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
          onDismiss={() => {
            window.location.href = window.location.href.split('?')[0]
          }}
        />
      )}
      {!subscription && !error && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <DefaultButton
            onClick={() => document.location.replace('/auth/signin')}
            iconProps={{ iconName: 'WindowsLogo' }}
            text={t('common.ms365signInText')}
          />
          <DefaultButton
            onClick={() => document.location.replace('/auth/google/signin')}
            iconProps={{ iconName: 'Mail' }}
            style={{ marginTop: 10 }}
            text={t('common.googleSignInText')}
          />
        </div>
      )}
    </div>
  )
}
