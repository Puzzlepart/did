import { Button } from '@fluentui/react-components'
import { UserMessage } from 'components'
import { Logo } from 'components/Logo'
import { PageComponent } from 'pages/types'
import React from 'react'
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

  if (redirectPage) {
    return <Redirect to={redirectPage} />
  }

  return (
    <div className={Home.className}>
      <Logo showMotto={true} dropShadow={true} />
      {error && (
        <UserMessage
          className={styles.error}
          intent='error'
          text={[`#### ${error.name} ####`, error.message].join('\n\n')}
        />
      )}
      {_.isEmpty(Object.keys(providers)) && (
        <UserMessage
          intent='warning'
          text={t('common.signInDisabledMessage')}
        />
      )}
      {!subscription && !error && (
        <div className={styles.signIn}>
          {Object.keys(providers).map((key) => (
            <Button
              key={key}
              appearance='subtle'
              icon={providers[key].icon}
              onClick={() => document.location.replace(`/auth/${key}/signin`)}
            >
              {providers[key].text}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

Home.displayName = 'Home'
Home.className = styles.home
Home.path = '/'
