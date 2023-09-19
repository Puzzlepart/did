/* eslint-disable @typescript-eslint/ban-types */
import { ButtonProps } from '@fluentui/react-components'
import { useAppContext } from 'AppContext'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { getFluentIcon } from 'utils/getFluentIcon'

interface IAuthProviderLoginButton
  extends Pick<ButtonProps, 'icon' | 'onClick' | 'appearance'> {
  text: string
}

/**
 * Get auth providers
 *
 * @returns button props for the enabled auth provider
 */
export function useAuthProviders(): Record<string, IAuthProviderLoginButton> {
  const { t } = useTranslation()
  const context = useAppContext()
  const authProviders: Record<string, IAuthProviderLoginButton> = {
    'azuread-openidconnect': {
      text: t('common.ms365signInText'),
      icon: getFluentIcon('Cloud')
    },
    google: {
      text: t('common.googleSignInText'),
      icon: getFluentIcon('Key')
    }
  }
  return _.pick(authProviders, context.authProviders)
}
