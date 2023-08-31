import { ToolbarButton } from '@fluentui/react-components'
import { SET_DATE_RANGE } from 'pages/Timesheet/reducer/actions'
import { TimesheetDateRange } from 'pages/Timesheet/TimesheetDateRange'
import React, { FC } from 'react'
import { useTimesheetContext } from '../../context'
import { CalendarToday } from '../icons'

export const TodayButton: FC = () => {
  const { state, dispatch } = useTimesheetContext()
  return (
    <ToolbarButton
      icon={<CalendarToday />}
      onClick={() => {
        dispatch(
          SET_DATE_RANGE(
            new TimesheetDateRange(new Date(), state.dateRangeType)
          )
        )
      }}
      disabled={state.dateRange.isCurrent || !!state.loading}
    />
  )
}
