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
  const regex = new RegExp(`(^[A-ZÆØÅ0-9]{2,${keyMaxLength}}$)`)
  const ValidateKeyFunction: ValidatorFunction<string> = (value) => {
    return (
      !regex.test(value) && [
        t('customers.keyInvalid', { min: 2, max: keyMaxLength }),
        'error'
      ]
    )
  }
  return ValidateKeyFunction
}
