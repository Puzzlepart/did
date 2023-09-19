import { ToolbarButton } from '@fluentui/react-components'
import { SET_DATE_RANGE } from 'pages/Timesheet/reducer/actions'
import { TimesheetDateRange } from 'pages/Timesheet/TimesheetDateRange'
import React, { FC } from 'react'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
import { useTimesheetContext } from '../../context'

export const TodayButton: FC = () => {
  const { state, dispatch } = useTimesheetContext()
  return (
    <ToolbarButton
      icon={icon('CalendarToday')}
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
