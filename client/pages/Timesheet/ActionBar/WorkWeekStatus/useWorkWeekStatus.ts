import { useAppContext, useSubscriptionSettings } from 'AppContext'
import { getHolidayHoursInPeriod } from 'DateUtils'
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
  if (holidaySettings?.enabled && holidaySettings?.holidays?.length > 0) {
    // Calculate total holiday hours across all periods in the week
    const totalHolidayHours = periods.reduce((sum, period) => {
      const periodHolidayHours = getHolidayHoursInPeriod(
        period.startDate,
        period.endDate,
        holidaySettings.holidays
      )
      return sum + periodHolidayHours
    }, 0)

    // Subtract holiday hours from expected work hours
    expectedHours = Math.max(0, workWeekHours - totalHolidayHours)
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
