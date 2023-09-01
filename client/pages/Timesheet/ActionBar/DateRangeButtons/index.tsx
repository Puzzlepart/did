import { DateRangeType } from '@fluentui/date-time-utilities'
import {
  ToolbarRadioButton,
  ToolbarRadioGroup
} from '@fluentui/react-components'
import React, { FC } from 'react'
import { CalendarMonth, CalendarWorkWeek } from '../icons'

export const DateRangeButtons: FC = () => {
  return (
    <ToolbarRadioGroup>
      <ToolbarRadioButton
        name='dateRange'
        value={DateRangeType.Week.toString()}
        icon={<CalendarMonth />}
      />
      <ToolbarRadioButton
        name='dateRange'
        value={DateRangeType.Month.toString()}
        icon={<CalendarWorkWeek />}
        style={{ margin: '0 0 0 6px' }}
      />
    </ToolbarRadioGroup>
  )
}
