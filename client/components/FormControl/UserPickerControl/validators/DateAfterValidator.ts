import { ValidatorFunction } from 'components'
import { TFunction } from 'react-i18next'
import $date from 'DateUtils'

/**
 * `DateAfterValidator` is a higher-order function that returns a validator function
 * to check if a given date is after a given date.
 */
export const DateAfterValidator = (t: TFunction, compareDate: Date) => {
  return ((value: Date) => {
    if (!value || !compareDate) return null
    return $date.isBefore(value, compareDate)
      ? [
          t('common.invalidDateAfterValidation', {
            date: $date.formatDate(compareDate, 'LL')
          }),
          'error'
        ]
      : null
  }) as ValidatorFunction
}
