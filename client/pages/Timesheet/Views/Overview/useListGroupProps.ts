import { useAppContext } from 'AppContext'
import $date, { DateObject } from 'DateUtils'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { EventObject } from 'types'
import { getSum } from 'utils'
import { IListGroupProps } from '../../../../components/List'
import { useTimesheetContext } from '../../context'

/**
 * Use list group props
 */
export function useListGroupProps() {
  const { t } = useTranslation()
  const {subscription} = useAppContext()
  const { state } = useTimesheetContext()
  return useMemo<IListGroupProps<EventObject>>(
    () => ({
      fieldName: 'date',
      groupNames: state.selectedPeriod?.weekdays<string>(
       subscription?.settings?.timesheet?.dayFormat
      ),
      groupData: state.selectedPeriod
        ?.weekdays<DateObject>('DateObject')
        .map((date) => ({
          holiday: date.isNationalHoliday(state.selectedPeriod?.holidays)
        })),
      totalFunc: (events) => {
        const duration = getSum(events, 'duration')
        return ` (${$date.getDurationString(duration, t)})`
      }
    }),
    [state.selectedPeriod]
  )
}
