import { ValidatorFunction } from 'components'
import { useTranslation } from 'react-i18next'

export function useInvitationNameValidator(): ValidatorFunction {
  const { t } = useTranslation()
  return ((value: string) => {
    if (value?.length === 0) {
      return [t('admin.users.invitationNameRecommended'), 'warning']
    }
  }) as ValidatorFunction
}
