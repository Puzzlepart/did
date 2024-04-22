import { ValidatorFunction } from 'components'
import { useTranslation } from 'react-i18next'

/**
 * Returns a validator function that checks if the given value is a valid project key.
 *
 * @param keyMaxLength The maximum length of the project key.
 *
 * @returns A ValidatorFunction that returns an error message and 'error' status if
 * the key is not valid, or null if it is valid.
 */

export function useValidateKeyFunction(keyMaxLength: number) {
  const { t } = useTranslation()
  const PROJECT_KEY_REGEX = new RegExp('(^[A-ZÆØÅ0-9-]{2,12}$)', 'gm')
  const ValidateKeyFunction: ValidatorFunction<string> = (value) => {
    return (
      !PROJECT_KEY_REGEX.test(value) && [
        t('projects.keyInvalid', { min: 2, max: keyMaxLength }),
        'error'
      ]
    )
  }
  return ValidateKeyFunction
}
