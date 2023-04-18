/* eslint-disable react-hooks/exhaustive-deps */
import { IReportsState } from 'pages/Reports/types'
import { TimesheetPeriodObject } from 'types'

/**
 * Generate column data from periods collection
 *
 * @param periods - Periods collection
 */
function generateColumnData(periods: TimesheetPeriodObject[]) {
  return periods.reduce((data, period) => {
    const key = [period.week, period.month, period.year].join('_')
    return {
      ...data,
      [key]: [...(data[key] || []), period]
    }
  }, {})
}

/**
 * Hooks for generating rows data from `state` data.
 */
export function useRows({ data }: IReportsState) {
  return [
    ...data.users.map((user) => {
      const periods = data.periods.filter((period) => period.userId === user.id)
      return {
        user,
        ...generateColumnData(periods)
      }
    }),
    {
      isTotalRow: true,
      ...generateColumnData(data.periods)
    }
  ]
}
