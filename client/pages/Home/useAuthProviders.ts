import { useAppContext } from 'AppContext'
import { useTranslation } from 'react-i18next'
import { pick } from 'underscore'

export function useAuthProviders() {
  const { t } = useTranslation()
  const context = useAppContext()
  const authProviders = {
    'azuread-openidconnect': {
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
