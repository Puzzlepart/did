import { useMemo } from 'react'
import { useAppContext } from 'AppContext'
import { getHolidayHoursInPeriod } from 'DateUtils'
import { useTimesheetState } from '../../context'

/**
 * Component logic hook for the `WorkWeekStatus` component.
 * Handles the logic for displaying the plus or minus hours for the current work week.
 * Now with memoization and enhanced error handling.
 */
export function useWorkWeekStatus() {
  const { getUserConfiguration } = useAppContext()
  const { periods, loading } = useTimesheetState()
  const workWeekHours = getUserConfiguration('workWeek.hours')

  // Memoize the calculation to avoid recomputing on every render
  return useMemo(() => {
    let text = null
    let background = null
    const iconName = null

    if (!workWeekHours || loading) {
      return { text, background, iconName, workWeekHoursDiff: 0 }
    }

    try {
      const totalHours = periods.reduce(
        (sum, { totalDuration }) => (sum += totalDuration),
        0
      )

      // Calculate expected hours accounting for holidays from periods
      let expectedHours = workWeekHours
      const totalHolidayHours = periods.reduce((sum, period) => {
        // Use holidays already fetched and attached to the period by TimesheetService
        if (period.holidays && period.holidays.length > 0) {
          try {
            const periodHolidayHours = getHolidayHoursInPeriod(
              period.startDate,
              period.endDate,
              period.holidays,
              workWeekHours // Pass for validation
            )
            return sum + periodHolidayHours
          } catch (error) {
            console.error(
              `Failed to calculate holiday hours for period ${period.startDate} - ${period.endDate}:`,
              error instanceof Error ? error.message : String(error)
            )
            return sum // Continue with other periods
          }
        }
        return sum
      }, 0)

      // Subtract holiday hours from expected work hours
      expectedHours = Math.max(0, workWeekHours - totalHolidayHours)

      // Log warning if holiday hours seem excessive
      if (totalHolidayHours > workWeekHours) {
        console.warn(
          `Holiday hours (${totalHolidayHours}) exceed work week hours (${workWeekHours}). ` +
            'This may indicate misconfigured holidays or duplicates.'
        )
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
    } catch (error) {
      console.error(
        'Error calculating work week status:',
        error instanceof Error ? error.message : String(error)
      )
      // Return default values on error
      return {
        text: null,
        background: null,
        iconName: null,
        workWeekHoursDiff: 0
      }
    }
  }, [workWeekHours, loading, periods]) // Dependencies for memoization
}
