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
