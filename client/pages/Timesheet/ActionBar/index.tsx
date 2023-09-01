import { Toolbar, ToolbarButton } from '@fluentui/react-components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTimesheetContext } from '../context'
import { NEXT_PERIOD, PREVIOUS_PERIOD } from '../reducer/actions'
import styles from './ActionBar.module.scss'
import { ConfirmButtons } from './ConfirmButtons'
import { DateRangeButtons } from './DateRangeButtons'
import { DateRangePicker } from './DateRangePicker'
import { ForecastButtons } from './ForecastButtons'
import { NavigatePeriodsButtons } from './NavigatePeriodsButtons'
import { TodayButton } from './TodayButton'
import { ArrowCircleLeft, ArrowCircleRight } from './icons'


/**
 * @category Timesheet
 */
export const ActionBar = () => {
  const { t } = useTranslation()
  const { state, dispatch } = useTimesheetContext()

  return (
    <div className={styles.root}>
      <Toolbar
       size='large'
       defaultCheckedValues={{
        dateRange: [state.dateRangeType.toString()],
      }}
       >
        <TodayButton />
        <ToolbarButton
          icon={<ArrowCircleLeft />}
          onClick={() => dispatch(PREVIOUS_PERIOD())}
          disabled={!!state.loading}
        />
        <ToolbarButton
          icon={<ArrowCircleRight />}
          onClick={() => dispatch(NEXT_PERIOD())}
          disabled={!!state.loading}
        />
        <DateRangePicker />
        <DateRangeButtons />
        <NavigatePeriodsButtons />
        <ForecastButtons />
        <ConfirmButtons />
      </Toolbar>
    </div>
  )
}
