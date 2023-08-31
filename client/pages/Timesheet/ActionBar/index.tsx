/* eslint-disable unicorn/prefer-query-selector */
import { DateRangeType } from '@fluentui/react'
import { Toolbar, ToolbarButton } from '@fluentui/react-components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTimesheetContext } from '../context'
import { NEXT_PERIOD, PREVIOUS_PERIOD } from '../reducer/actions'
import { ConfirmButtons } from './ConfirmButtons'
import { DateRangeButton } from './DateRangeButton'
import { DateRangePicker } from './DateRangePicker'
import { ForecastButtons } from './ForecastButtons'
import { ArrowCircleLeft, ArrowCircleRight } from './icons'
import { NavigatePeriodsButtons } from './NavigatePeriodsButtons'
import { TodayButton } from './TodayButton'

/**
 * @category Timesheet
 */
export const ActionBar = () => {
  const { t } = useTranslation()
  const { state, dispatch } = useTimesheetContext()

  return (
    <div>
      <Toolbar size='large'>
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
        <DateRangeButton
          dateRangeType={DateRangeType.Week}
          text={t('timesheet.dateRangeWeek')}
        />
        <DateRangeButton
          dateRangeType={DateRangeType.Month}
          text={t('timesheet.dateRangeMonth')}
        />
        <NavigatePeriodsButtons />
        <ForecastButtons />
        <ConfirmButtons />
      </Toolbar>
    </div>
  )
}
