import { DateRangeType } from '@fluentui/date-time-utilities'
import {
  ToolbarRadioButton,
  ToolbarRadioButtonProps
} from '@fluentui/react-components'
import { TimesheetContext } from 'pages/Timesheet/context'
import React, { FC } from 'react'
import { isBrowser } from 'react-device-detect'
import { getFluentIcon as icon } from 'utils/getFluentIcon'

/**
 * Renders the date range buttons for a timesheet period.
 *
 * @category Timesheet
 */
export const DateRangeButtons: FC<Pick<ToolbarRadioButtonProps, 'name'>> = ({
  name
}) =>
  isBrowser && (
    <TimesheetContext.Consumer>
      {({ state }) => (
        <>
          <ToolbarRadioButton
            name={name}
            value={DateRangeType.Week.toString()}
            icon={icon('CalendarMonth')}
            disabled={!!state.loading}
          />
          <ToolbarRadioButton
            name={name}
            value={DateRangeType.Month.toString()}
            icon={icon('CalendarWorkWeek')}
            style={{ margin: '0 0 0 6px' }}
            disabled={!!state.loading}
          />
        </>
      )}
    </TimesheetContext.Consumer>
  )
