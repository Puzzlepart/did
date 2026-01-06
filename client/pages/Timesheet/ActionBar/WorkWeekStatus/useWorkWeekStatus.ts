import { useAppContext, useSubscriptionSettings } from 'AppContext'
import { getExpectedHoursForPeriod } from 'DateUtils'
import { SubscriptionHolidaySettings } from 'types'
import { useTimesheetState } from '../../context'

/**
 * Component logic hook for the `WorkWeekStatus` component.
 * Handles the logic for displaying the plus or minus hours for the current work week.
 */
export function useWorkWeekStatus() {
  const { getUserConfiguration } = useAppContext()
  const holidaySettings =
    useSubscriptionSettings<SubscriptionHolidaySettings>('holidays')
  const { periods, loading } = useTimesheetState()
  let text = null
  let background = null
  const iconName = null
  const workWeekHours = getUserConfiguration('workWeek.hours')

  if (!workWeekHours || loading) {
    return { text, background, iconName, workWeekHoursDiff: 0 }
  }

  const totalHours = periods.reduce(
    (sum, { totalDuration }) => (sum += totalDuration),
    0
  )

  // Calculate expected hours accounting for holidays
  let expectedHours = workWeekHours
  if (holidaySettings?.enabled && holidaySettings?.holidays) {
    // Sum up expected hours for all periods, accounting for holidays in each
    expectedHours = periods.reduce((sum, period) => {
      const periodExpectedHours = getExpectedHoursForPeriod(
        workWeekHours / periods.length, // Divide work week hours by number of periods
        period.startDate,
        period.endDate,
        holidaySettings.holidays
      )
      return sum + periodExpectedHours
    }, 0)
  }

  const workWeekHoursDiff = totalHours - expectedHours
  if (workWeekHoursDiff === 0 || totalHours === 0) {
    return { text, background, iconName, workWeekHoursDiff: 0 }
  }

  if (workWeekHoursDiff > 0) {
    text = `${workWeekHoursDiff.toFixed(2)} timer`
    background = '#0e700e'
  } else {
    text = `${(workWeekHoursDiff * -1).toFixed(2)} timer`
    background = '#c50f1f'
  }
  return {
    workWeekHoursDiff,
    text,
    background,
    iconName
  }
}
