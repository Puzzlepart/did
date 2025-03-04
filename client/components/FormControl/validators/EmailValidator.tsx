import { ValidatorFunction } from 'components'
import { TFunction } from 'react-i18next'

/**
 * EmailValidator is a higher-order function that returns a validator function
 * to check if a given string is a valid email address.
 *
 * @param  t - A translation function used to get the validation error message.
 *
 * @returns A function that takes a string value and returns null if the value is a valid email,
 * or an array containing the error message and 'error' if the value is invalid.
 */
export const EmailValidator = (t: TFunction) => {
  return ((value: string) => {
    if (!value) return null
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
      ? null
      : [t('common.invalidEmailValidation'), 'error']
  }) as ValidatorFunction
}
