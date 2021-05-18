/* eslint-disable @typescript-eslint/ban-types */
import { IButtonProps } from '@fluentui/react'
import { useAppContext } from 'AppContext'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'

/**
 * Get auth providers
 *
 * @returns button props for the enabled auth provider
 */
export function useAuthProviders(): Record<string, IButtonProps> {
  const { t } = useTranslation()
  const context = useAppContext()
  const authProviders: Record<string, IButtonProps> = {
    'azuread-openidconnect': {
      text: t('common.ms365signInText'),
      iconProps: { iconName: 'WindowsLogo' }
    },
    google: {
      text: t('common.googleSignInText'),
      iconProps: { iconName: 'Mail' }
    }
  }
  return _.pick(authProviders, context.authProviders)
}
