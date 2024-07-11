import { useAppContext } from 'AppContext'
import { useTimesheetState } from 'pages/Timesheet/context'

export function useWorkWeekStatus() {
  const { getUserConfiguration } = useAppContext()
  const { periods, loading } = useTimesheetState()
  let text = null
  let background = null
  const workWeekHours = getUserConfiguration('workWeek.hours')
  if (!workWeekHours || loading) {
    return { text, background }
  }
  const totalHours = periods.reduce((sum, period) => sum += period.totalDuration, 0)
  const workWeekHoursDiff = (totalHours - workWeekHours)
  if (workWeekHoursDiff === 0 || totalHours === 0) {
    return { text, background }
  }

  if (workWeekHoursDiff > 0) {
    text = `+${workWeekHoursDiff} timer`
    background = '#0e700e'
  } else {
    text = `-${workWeekHoursDiff * -1} timer`
    background = '#c50f1f'
  }
  return { text, background }
}
