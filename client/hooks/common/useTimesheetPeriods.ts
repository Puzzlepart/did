import { DateObject, IDatePeriod } from 'DateUtils'
import { ConfirmedPeriodsQuery } from 'types'

/**
 * Get Timesheet periods
 *
 * @param weeksCount - Number of weeks to retrieve
 *
 * @returns Timesheet periods for a number of weeks in the past
 */
export function useTimesheetPeriods(weeksCount = 8) {
  const periods: IDatePeriod[] = []
  const weeks: [number, number][] = []
  let now = new DateObject()
  for (let index = 0; index < weeksCount; index++) {
    const { week, year } = now.toObject()
    weeks.push([week, year])
    now = now.add('-1w')
  }
  for (const [week, year] of weeks) {
    const _periods = new DateObject().fromObject({ week, year }).getPeriods()
    for (const p of _periods) {
      periods.push(p)
    }
  }
  const queries: ConfirmedPeriodsQuery[] = weeks.map(([week, year]) => ({
    week,
    year
  }))
  return { weeks, periods, queries } as const
}
