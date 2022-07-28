/* eslint-disable tsdoc/syntax */
import $date from 'DateUtils'
import _ from 'underscore'
import s from 'underscore.string'
import { IPeriodColumnTooltipProps } from './types'

/**
 * @ignore
 */
export function usePeriodColumnTooltip(props: IPeriodColumnTooltipProps) {
  const { week, month, year } = _.first(props.periods)
  const customerTotals = Object.keys(props.hours.project)
    .map((key) => {
      const { hours, details } = props.hours.project[key]
      return { customer: details.customer.name, hours }
    })
    .sort(({ customer: a }, { customer: b }) => {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    })
  return {
    week,
    year,
    month: s.pad(month, 2, '0'),
    monthName: $date.getMonthName(Number.parseInt(month) - 1, 'MMM'),
    customerTotals
  }
}
