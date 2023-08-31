import { DateRangeType } from '@fluentui/react'
import { ToolbarButton } from '@fluentui/react-components'
import { CHANGE_DATE_RANGE_TYPE } from 'pages/Timesheet/reducer/actions'
import React, { FC } from 'react'
import { useTimesheetContext } from '../../context'
import { CalendarMonth, CalendarWorkWeek } from '../icons'
import { IDateRangeButtonProps } from './types'

export const DateRangeButton: FC<IDateRangeButtonProps> = (props) => {
  const { state, dispatch } = useTimesheetContext()
  const Icon =
    props.dateRangeType === DateRangeType.Week ? (
      <CalendarWorkWeek />
    ) : (
      <CalendarMonth />
    )
  return (
    <ToolbarButton
      appearance={
        state.dateRangeType === props.dateRangeType ? 'primary' : 'subtle'
      }
      icon={Icon}
      onClick={() => {
        dispatch(CHANGE_DATE_RANGE_TYPE(props.dateRangeType))
      }}
    >
      {props.text}
    </ToolbarButton>
  )
}
