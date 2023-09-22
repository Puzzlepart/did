import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup
} from '@fluentui/react-components'
import React from 'react'
import { StyledComponent } from 'types'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
import { useTimesheetContext } from '../context'
import { NEXT_PERIOD, PREVIOUS_PERIOD } from '../reducer/actions'
import styles from './ActionBar.module.scss'
import { ConfirmButtons } from './ConfirmButtons'
import { DateRangeButtons } from './DateRangeButtons'
import { DateRangePicker } from './DateRangePicker'
import { ForecastButtons } from './ForecastButtons'
import { NavigatePeriodsButtons } from './NavigatePeriodsButtons'
import { TodayButton } from './TodayButton'
import { useActionBar } from './useActionBar'

/**
 * @category Timesheet
 */
export const ActionBar: StyledComponent = () => {
  const { state, dispatch } = useTimesheetContext()
  const { defaultCheckedValues, onCheckedValueChange } = useActionBar()
  return (
    <div className={ActionBar.className}>
      <Toolbar
        style={{
          justifyContent: 'space-between'
        }}
        defaultCheckedValues={defaultCheckedValues}
        onCheckedValueChange={onCheckedValueChange}
      >
        <ToolbarGroup style={{ flex: 1, display: 'inline-flex' }}>
          <TodayButton />
          <ToolbarButton
            icon={icon('ArrowCircleLeft')}
            onClick={() => dispatch(PREVIOUS_PERIOD())}
            disabled={!!state.loading}
          />
          <ToolbarButton
            icon={icon('ArrowCircleRight')}
            onClick={() => dispatch(NEXT_PERIOD())}
            disabled={!!state.loading}
          />
          <DateRangePicker />
          <DateRangeButtons name='dateRange' />
          <NavigatePeriodsButtons name='period' />
        </ToolbarGroup>
        <ToolbarGroup>
          <ForecastButtons />
          <ConfirmButtons />
        </ToolbarGroup>
      </Toolbar>
    </div>
  )
}

ActionBar.displayName = 'Timesheet.ActionBar'
ActionBar.className = styles.actionBar
