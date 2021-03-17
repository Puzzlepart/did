import { AppContext } from 'AppContext'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { pick } from 'underscore'

export function useAuthProviders() {
  const { t } = useTranslation()
  const context = useContext(AppContext)
  const authProviders = {
    ad: {
      text: t('common.ms365signInText'),
      iconName: 'WindowsLogo'
    },
    google: {
      text: t('common.googleSignInText'),
      iconName: 'Mail'
    }
  }
  return pick(authProviders, context.authProviders)
}
