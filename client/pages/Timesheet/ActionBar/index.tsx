import { Toolbar, ToolbarButton } from '@fluentui/react-components'
import { Progress } from 'components/Progress'
import React from 'react'
import { getFluentIcon } from 'utils'
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
export const ActionBar = () => {
  const { state, dispatch } = useTimesheetContext()
  const { defaultCheckedValues, onCheckedValueChange } = useActionBar()

  if (!!state.loading) {
    return (
      <div className={styles.root}>
        <Progress {...state.loading} padding='15px' />
      </div>
    )
  }
  return (
    <div className={styles.root}>
      {state.selectedPeriod ? (
        <Toolbar
          size='large'
          defaultCheckedValues={defaultCheckedValues}
          onCheckedValueChange={onCheckedValueChange}
        >
          <TodayButton />
          <ToolbarButton
            icon={getFluentIcon('ArrowCircleLeft')}
            onClick={() => dispatch(PREVIOUS_PERIOD())}
            disabled={!!state.loading}
          />
          <ToolbarButton
            icon={getFluentIcon('ArrowCircleRight')}
            onClick={() => dispatch(NEXT_PERIOD())}
            disabled={!!state.loading}
          />
          <DateRangePicker />
          <DateRangeButtons />
          <NavigatePeriodsButtons />
          <ForecastButtons />
          <ConfirmButtons />
        </Toolbar>
      ) : null}
    </div>
  )
}
