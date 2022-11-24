/* eslint-disable unicorn/no-array-reduce */
/* eslint-disable react-hooks/exhaustive-deps */
import $date, { DateObject } from 'DateUtils'
import packageFile from 'package'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { EventObject } from 'types'
import { IListGroupProps } from '../../../../components/List'
import { useTimesheetContext } from '../../context'

/**
 * Use list group props
 */
export function useListGroupProps() {
  const { t } = useTranslation()
  const { state } = useTimesheetContext()
  return useMemo<IListGroupProps>(
    () => ({
      fieldName: 'date',
      groupNames: state.selectedPeriod?.weekdays<string>(
        packageFile.config.app.TIMESHEET_OVERVIEW_DAY_FORMAT
      ),
      groupData: state.selectedPeriod
        ?.weekdays<DateObject>('DateObject')
        .map((date) => ({
          holiday: date.isNationalHoliday(state.selectedPeriod?.holidays)
        })),
      totalFunc: (events: EventObject[]) => {
        const duration = events.reduce((sum, index) => sum + index.duration, 0)
        return ` (${$date.getDurationString(duration, t)})`
      }
    }),
    [state.selectedPeriod]
  )
}