/* eslint-disable unicorn/no-array-reduce */
/* eslint-disable react-hooks/exhaustive-deps */
import $date from 'DateUtils'
import __package from 'package'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { EventObject } from 'types'
import { useTimesheetContext } from '../context'

/**
 * Use groups
 */
export function useGroups() {
  const { t } = useTranslation()
  const { state } = useTimesheetContext()
  return useMemo(
    () => ({
      fieldName: 'date',
      groupNames: state.selectedPeriod?.weekdays(
        __package.config.app.TIMESHEET_OVERVIEW_DAY_FORMAT
      ),
      totalFunc: (events: EventObject[]) => {
        const duration = events.reduce((sum, index) => sum + index.duration, 0)
        return ` (${$date.getDurationString(duration, t)})`
      }
    }),
    [state.selectedPeriod]
  )
}
