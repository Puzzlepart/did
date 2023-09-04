import { DateRangeType } from '@fluentui/date-time-utilities'
import {
  ToolbarRadioButton,
  ToolbarRadioButtonProps
} from '@fluentui/react-components'
import React, { FC } from 'react'
import { getFluentIcon as icon } from 'utils/getFluentIcon'

export const DateRangeButtons: FC<Pick<ToolbarRadioButtonProps, 'name'>> = ({
  name
}) => {
  return (
    <>
      <ToolbarRadioButton
        name={name}
        value={DateRangeType.Week.toString()}
        icon={icon('CalendarMonth')}
      />
      <ToolbarRadioButton
        name={name}
        value={DateRangeType.Month.toString()}
        icon={icon('CalendarWorkWeek')}
        style={{ margin: '0 0 0 6px' }}
      />
    </>
  )
}
