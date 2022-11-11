import $date from 'DateUtils'
import _ from 'underscore'
import s from 'underscore.string'

/**
 * @ignore
 */
export function usePeriodColumnTooltip({ periods, hours }) {
  const { week, month, year } = _.first(periods)
  const customerTotals = Object.keys(hours.project)
    .map((key) => {
      const { hours: hours_, details } = hours.project[key]
      return { customer: details.customer.name, hours: hours_ }
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
