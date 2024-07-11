import { useAppContext } from 'AppContext'
import { useTimesheetState } from 'pages/Timesheet/context'

/**
 * Component logic hook for the `WorkWeekStatus` component.
 * Handles the logic for displaying the plus or minus hours for the current work week.
 */
export function useWorkWeekStatus() {
  const { getUserConfiguration } = useAppContext()
  const { periods, loading } = useTimesheetState()
  let text = null
  let background = null
  const iconName = null
  const workWeekHours = getUserConfiguration('workWeek.hours')
  if (!workWeekHours || loading) {
    return { text, background, iconName }
  }
  const totalHours = periods.reduce((sum, { totalDuration }) => sum += totalDuration, 0)
  const workWeekHoursDiff = (totalHours - workWeekHours)
  if (workWeekHoursDiff === 0 || totalHours === 0) {
    return { text, background, iconName }
  }

  if (workWeekHoursDiff > 0) {
    text = `${workWeekHoursDiff} timer`
    background = '#0e700e'
  } else {
    text = `${workWeekHoursDiff * -1} timer`
    background = '#c50f1f'
  }
  return { text, background, iconName }
}
