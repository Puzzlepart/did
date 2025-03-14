import { ValidatorFunction } from 'components'
import { TFunction } from 'react-i18next'
import $date from 'DateUtils'

/**
 * `DateBeforeValidator` is a higher-order function that returns a validator function
 * to check if a given date is before a given date.
 */
export const DateBeforeValidator = (t: TFunction, compareDate: Date) => {
  return ((value: Date) => {
    if (!value || !compareDate) return null
    return $date.isBefore(value, compareDate)
      ? null
      : [
          t('common.invalidDateBeforeValidation', {
            date: $date.formatDate(compareDate, 'LL')
          }),
          'error'
        ]
  }) as ValidatorFunction
}
