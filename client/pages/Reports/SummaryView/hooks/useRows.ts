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
 * Hooks for generating rows data from `state` data.
 */
export function useRows() {
  const context = useReportsContext()
  return [
    ...context.state.data.users.map((user) => {
      const periods = context.state.data.periods.filter((period) => period.userId === user.id)
      return {
        user,
        ...generateColumnData(periods)
      }
    }),
    {
      isTotalRow: true,
      ...generateColumnData(context.state.data.periods)
    }
  ]
}
