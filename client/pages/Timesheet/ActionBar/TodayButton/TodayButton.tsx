import { ToolbarButton } from '@fluentui/react-components'
import React, { FC } from 'react'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
import { useTimesheetContext } from '../../context'
import { SET_DATE_RANGE } from '../../reducer/actions'
import { TimesheetDateRange } from '../../types'

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
