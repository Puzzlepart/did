import { ValidatorFunction } from 'components'
import { useTranslation } from 'react-i18next'

/**
 * Returns a validator function that checks if the given value is a valid customer key.
 *
 * @param keyMaxLength The maximum length of the customer key.
 *
 * @returns A ValidatorFunction that returns an error message and 'error' status if
 * the key is not valid, or null if it is valid.
 */

export function useValidateKeyFunction(keyMaxLength: number) {
  const { t } = useTranslation()
  const CUSTOMER_KEY_REGEX = new RegExp('(^[A-ZÆØÅ0-9]{2,12}$)', 'gm')
  // eslint-disable-next-line no-console
  console.log('CUSTOMER_KEY_REGEX', CUSTOMER_KEY_REGEX)
  const ValidateKeyFunction: ValidatorFunction<string> = (value) => {
    // eslint-disable-next-line no-console
    console.log('ValidateKeyFunction', CUSTOMER_KEY_REGEX.test(value))
    return (
      !CUSTOMER_KEY_REGEX.test(value) && [
        t('customers.keyInvalid', { min: 2, max: keyMaxLength }),
        'error'
      ]
    )
  }
  return ValidateKeyFunction
}
