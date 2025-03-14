import { ValidatorFunction } from 'components'
import { TFunction } from 'react-i18next'
import $date from 'DateUtils'

type TimespanValidatorOptions = {
  minDays?: number
  maxDays?: number
}

/**
 * `TimespanValidator` is a higher-order function that returns a validator function
 * to check if the timespan between two dates is valid.
 */
export const TimespanValidator = (
  t: TFunction,
  compareDate: { name: string; value: Date },
  options: TimespanValidatorOptions = {}
) => {
  return ((value: Date) => {
    if (!value) return null
    if (!compareDate.value)
      return [
        t('common.invalidTimespanValidationMaxDays', {
          ...compareDate,
          days: options.maxDays
        }),
        'error'
      ]
    const diffDays = Math.abs($date.diff(value, compareDate.value, 'days'))
    if (options.maxDays) {
      return diffDays > options.maxDays
        ? [
            t('common.invalidTimespanValidationMaxDays', {
              ...compareDate,
              days: options.maxDays
            }),
            'error'
          ]
        : null
    }
    if (options.minDays) {
      return diffDays < options.minDays
        ? [
            t('common.invalidTimespanValidationMinDays', {
              ...compareDate,
              days: options.minDays
            }),
            'error'
          ]
        : null
    }
    return null
  }) as ValidatorFunction
}
