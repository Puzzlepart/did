import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Returns expiry options for API tokens
 */
export function useExpiryOptions() {
  const { t } = useTranslation()
  return useMemo(
    () => ({
      '1month': t('admin.apiTokens.oneMonth'),
      '3month': t('admin.apiTokens.monthPlural', { months: 3 }),
      '1year': t('admin.apiTokens.oneYear'),
      '10year': t('admin.apiTokens.neverExpiresText')
    }),
    []
  )
}
