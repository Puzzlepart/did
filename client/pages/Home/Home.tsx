import { Button } from '@fluentui/react-components'
import { Logo } from 'components/Logo'
import { PageComponent } from 'pages/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Redirect } from 'react-router-dom'
import _ from 'underscore'
import styles from './Home.module.scss'
import { LoginError } from './LoginError'
import { useAuthProviders } from './useAuthProviders'
import { useHome } from './useHome'

/**
 * Home page
 *
 * @category Page Component
 */
export const Home: PageComponent = () => {
  const { t } = useTranslation()
  const { loginError, subscription, redirectPage } = useHome()
  const providers = useAuthProviders()

  if (redirectPage) {
    return <Redirect to={redirectPage} />
  }

  return (
    <div className={Home.className}>
      <Logo showMotto={true} dropShadow={true} />
      {loginError && (
        <LoginError text={loginError.name} message={loginError.message} />
      )}
      {_.isEmpty(Object.keys(providers)) && (
        <LoginError text={t('common.signInDisabledText')} />
      )}
      {!subscription && !loginError && (
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
