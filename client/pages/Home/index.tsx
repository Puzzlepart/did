/* eslint-disable tsdoc/syntax */
import { UserMessage } from 'components'
import { DefaultButton, MessageBarType } from 'office-ui-fabric-react'
import { description, name } from 'package'
import { PageComponent } from 'pages/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import styles from './Home.module.scss'
import { useAuthProviders } from './useAuthProviders'
import { useHome } from './useHome'

/**
 * Home page
 *
 * @category Page Component
 */
export const Home: PageComponent = () => {
  const { error, subscription } = useHome()
  const providers = useAuthProviders()
  const { t } = useTranslation()

  return (
    <div className={styles.root}>
      <div className={styles.logo}>{name}</div>
      <p className={styles.motto}>{description}</p>
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
      {isEmpty(Object.keys(providers)) && (
        <UserMessage
          type={MessageBarType.warning}
          text={t('common.signInDisabledMessage')}
        />
      )}
      {!subscription && !error && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {Object.keys(providers).map((key) => (
            <DefaultButton
              key={key}
              onClick={() => document.location.replace(`/auth/${key}/signin`)}
              iconProps={providers[key].iconProps}
              style={{ marginTop: 10 }}
              text={providers[key].text}
            />
          ))}
        </div>
      )}
    </div>
  )
}

Home.path = '/'
