import { TimesheetPeriodObject } from 'types'
import { useReportsContext } from '../../context'

/**
 * Generate column data from periods collection
 *
 * @param periods - Periods collection
 */
function generateColumnData(periods: TimesheetPeriodObject[] = []) {
  return periods.reduce((data, period) => {
    const key = [period.week, period.month, period.year].join('_')
    return {
      ...data,
      [key]: [...(data[key] || []), period]
    }
  }, {})
}

/**
 * Hooks for generating rows data from `state` data. Generates
 * rows for each user and a total row. If the user has no hours
 * in the selected periods, the row is not included.
 * 
 * @category SummaryView
 */
export function useRows() {
  const context = useReportsContext()
  const rows = [
    ...context.state.data.users.map((user) => {
      const periods = context.state.data.periods.filter(
        (period) => period.userId === user.id
      )
      return {
        user,
        ...generateColumnData(periods)
      }
    }),
    {
      isTotalRow: true,
      ...generateColumnData(context.state.data.periods)
    }
  ].filter((row) => Object.keys(row).length > 1)
  return rows
}
