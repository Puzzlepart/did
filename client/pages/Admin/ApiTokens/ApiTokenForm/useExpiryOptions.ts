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
      '6month': t('admin.apiTokens.monthPlural', { months: 6 }),
      '1year': t('admin.apiTokens.oneYear'),
      '3year': t('admin.apiTokens.yearPlural', { years: 3 }),
      '5year': t('admin.apiTokens.yearPlural', { years: 5 }),
      '15year': t('admin.apiTokens.neverExpiresText')
    }),
    []
  )
}
