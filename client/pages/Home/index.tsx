/* eslint-disable tsdoc/syntax */
import { DefaultButton, useTheme } from '@fluentui/react'
import { UserMessage } from 'components'
import packageFile from 'package'
import { PageComponent } from 'pages/types'
import React, { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { Redirect } from 'react-router-dom'
import _ from 'underscore'
import styles from './Home.module.scss'
import { useAuthProviders } from './useAuthProviders'
import { useHome } from './useHome'

/**
 * Home page
 *
 * @category Page Component
 */
export const Home: PageComponent = () => {
  const { t } = useTranslation()
  const { error, subscription, redirectPage } = useHome()
  const providers = useAuthProviders()
  const { components } = useTheme()

  if (redirectPage) {
    return <Redirect to={redirectPage} />
  }

  return (
    <div className={styles.root}>
      <div
        className={styles.logo}
        style={components.logo.styles as CSSProperties}
      >
        {packageFile.name}
      </div>
      <div
        className={styles.motto}
        style={components.motto.styles as CSSProperties}
      >
        {packageFile.description}
      </div>
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
      {_.isEmpty(Object.keys(providers)) && (
        <UserMessage type='warning' text={t('common.signInDisabledMessage')} />
      )}
      {!subscription && !error && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {Object.keys(providers).map((key) => (
            <DefaultButton
              key={key}
              className={styles.signInButton}
              onClick={() => document.location.replace(`/auth/${key}/signin`)}
              iconProps={providers[key].iconProps}
              text={providers[key].text}
            />
          ))}
        </div>
      )}
    </div>
  )
}

Home.path = '/'
