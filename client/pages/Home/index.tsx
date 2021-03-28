/* eslint-disable tsdoc/syntax */
import { DefaultButton } from '@fluentui/react'
import { UserMessage } from 'components'
import __package from 'package'
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
      <div className={styles.logo}>{__package.name}</div>
      <p className={styles.motto}>{__package.description}</p>
      {error && (
        <UserMessage
          className={styles.error}
          type='error'
          iconName={error.icon}
          text={[`#### ${error.name} ####`, error.message].join('\n\n')}
          onDismiss={() => {
            window.location.href = window.location.href.split('?')[0]
          }}
        />
      )}
      {isEmpty(Object.keys(providers)) && (
        <UserMessage type='warning' text={t('common.signInDisabledMessage')} />
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
