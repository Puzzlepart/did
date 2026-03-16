import { useAppContext } from 'AppContext'
import $date, { DateObject } from 'DateUtils'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { EventObject } from 'types'
import { getSum } from 'utils'
import { IListGroupProps } from '../../../../components/List'
import { useTimesheetContext } from '../../context'

/**
 * Hook that returns the list group props for the timesheet overview.
 * Weekend days (Saturday and Sunday) with no logged hours are hidden.
 */
export function useListGroupProps() {
  const { t } = useTranslation()
  const { subscription } = useAppContext()
  const { state } = useTimesheetContext()
  return useMemo<IListGroupProps<EventObject>>(
    () => {
      const dayFormat = subscription?.settings?.timesheet?.dayFormat
      const weekdayDates = state.selectedPeriod?.weekdays<DateObject>('DateObject') ?? []
      const weekdayNames = state.selectedPeriod?.weekdays<string>(dayFormat) ?? []
      const eventDates = new Set(
        (state.selectedPeriod?.getEvents() ?? []).map((e) => e.date)
      )
      const filteredIndices = weekdayDates
        .map((date, index) => ({ date, index }))
        .filter(({ date, index }) => {
          const dayOfWeek = date.$.day()
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
          return !isWeekend || eventDates.has(weekdayNames[index])
        })
        .map(({ index }) => index)
      return {
        fieldName: 'date',
        groupNames: filteredIndices.map((i) => weekdayNames[i]),
        groupData: filteredIndices.map((i) => ({
          holiday: weekdayDates[i].isNationalHoliday(state.selectedPeriod?.holidays)
        })),
        totalFunc: (events) => {
          const duration = getSum(events, 'duration')
          return $date.getDurationString(duration, t)
        }
      }
    },
    [state.selectedPeriod, subscription?.settings?.timesheet?.dayFormat]
  )
}
