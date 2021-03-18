import { useTranslation } from 'react-i18next'

/**
 * Returns expiry options for api tokens
 */
export function useExpiryOptions() {
  const { t } = useTranslation()
  return {
    '1month': t('admin.apiTokens.oneMonth'),
    '3month': t('admin.apiTokens.monthPlural', { months: 3 }),
    '1year': t('admin.apiTokens.oneYear'),
    '30year': t('admin.apiTokens.neverExpiresText')
  }
}
