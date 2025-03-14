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
    const maxDaysValidationError = t(
      'common.invalidTimespanValidationMaxDays',
      {
        ...compareDate,
        days: options.maxDays
      }
    )
    const minDaysValidationError = t(
      'common.invalidTimespanValidationMinDays',
      {
        ...compareDate,
        days: options.minDays
      }
    )

    if (!compareDate.value) {
      if (options.maxDays) {
        return [maxDaysValidationError, 'error']
      }
      if (options.minDays) {
        return [minDaysValidationError, 'error']
      }
      return null
    }

    const diffDays = Math.abs($date.diff(value, compareDate.value, 'days'))
    if (options.maxDays) {
      return diffDays > options.maxDays
        ? [maxDaysValidationError, 'error']
        : null
    }
    if (options.minDays) {
      return diffDays < options.minDays
        ? [minDaysValidationError, 'error']
        : null
    }
    return null
  }) as ValidatorFunction
}
