import { DateRangeType } from '@fluentui/date-time-utilities'
import {
  ToolbarRadioButton,
  ToolbarRadioButtonProps
} from '@fluentui/react-components'
import { TimesheetContext } from 'pages/Timesheet/context'
import React from 'react'
import { isBrowser } from 'react-device-detect'
import { StyledComponent } from 'types'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
import styles from './DateRangeTypeButtons.module.scss'

/**
 * Renders the date range buttons for a timesheet period, which allow the user
 * to switch between viewing the timesheet by week or by month. We could also
 * support work week, but that's not a priority.
 *
 * @category Timesheet
 */
export const DateRangeTypeButtons: StyledComponent<Pick<ToolbarRadioButtonProps, 'name'>> = ({
  name
}) =>
  isBrowser && (
    <TimesheetContext.Consumer>
      {({ state }) => (
        <div className={DateRangeTypeButtons.className}>
          <ToolbarRadioButton
            name={name}
            value={DateRangeType.Week.toString()}
            icon={icon('CalendarMonth')}
            disabled={!!state.loading || state.dateRangeType === DateRangeType.Week}
          />
          <ToolbarRadioButton
            name={name}
            value={DateRangeType.Month.toString()}
            icon={icon('CalendarWorkWeek')}
            disabled={!!state.loading || state.dateRangeType === DateRangeType.Month}
          />
        </div>
      )}
    </TimesheetContext.Consumer>
  )

  DateRangeTypeButtons.displayName = 'DateRangeTypeButtons'
  DateRangeTypeButtons.className = styles.dateRangeTypeButtons
