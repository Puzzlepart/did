import { useSubscriptionSettings } from 'AppContext'
import { ValidatorFunction } from 'components'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'

export function useEmailDomainValidator() {
  const { t } = useTranslation()
  const domainRestrictionExternal = useSubscriptionSettings<string[]>(
    'security.domainRestrictionExternal'
  )
  return ((value: string) => {
    if (!value) return null
    const emailDomain = value.split('@')[1]
    if (_.isEmpty(domainRestrictionExternal) || emailDomain?.length === 0)
      return null
    const isValidDomain = _.some(
      domainRestrictionExternal,
      (domain) => domain.toLowerCase() === emailDomain.toLowerCase()
    )
    return isValidDomain
      ? null
      : [
          t('common.invalidEmailDomainValidation', {
            domain: emailDomain
          }),
          'error'
        ]
  }) as ValidatorFunction
}
