import { ValidatorFunction } from 'components'
import { TFunction } from 'react-i18next'

export const EmailValidator = (t: TFunction) => {
  return ((value: string) => {
    if (!value) return null
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
      ? null
      : [t('common.invalidEmailValidation'), 'error']
  }) as ValidatorFunction
}
