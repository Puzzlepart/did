/* eslint-disable unicorn/no-array-reduce */
/* eslint-disable react-hooks/exhaustive-deps */
import DateUtils from 'DateUtils'
import { config } from 'package'
import { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { EventObject } from 'types'
import { TimesheetContext } from '../context'

/**
 * Use groups
 */
export function useGroups() {
  const { t } = useTranslation()
  const { selectedPeriod } = useContext(TimesheetContext)
  return useMemo(
    () => ({
      fieldName: 'date',
      groupNames: selectedPeriod?.weekdays(
        config.app.TIMESHEET_OVERVIEW_DAY_FORMAT
      ),
      totalFunc: (events: EventObject[]) => {
        const duration = events.reduce((sum, index) => sum + index.duration, 0)
        return ` (${DateUtils.getDurationString(duration, t)})`
      }
    }),
    [selectedPeriod]
  )
}
