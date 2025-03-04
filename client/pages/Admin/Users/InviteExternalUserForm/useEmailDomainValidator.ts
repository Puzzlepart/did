import { useSubscriptionSettings } from 'AppContext'
import { ValidatorFunction } from 'components'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'

/**
 * Custom hook that returns a validator function to check if an email domain is allowed.
 * 
 * The validator function checks if the domain part of the email is included in the list of allowed domains
 * specified in the subscription settings under 'security.domainRestrictionExternal'.
 * 
 * @returns A function that takes an email string as input and returns:
 * - `null` if the email domain is valid or if there are no domain restrictions.
 * - An array containing an error message and the string 'error' if the email domain is not valid.
 */
export function useEmailDomainValidator(): ValidatorFunction {
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
  }) as ValidatorFunction<string>
}
