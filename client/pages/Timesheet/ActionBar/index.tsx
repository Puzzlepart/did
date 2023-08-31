/* eslint-disable unicorn/prefer-query-selector */
import { Toolbar, ToolbarButton } from '@fluentui/react-components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTimesheetContext } from '../context'
import {
  NEXT_PERIOD,
  PREVIOUS_PERIOD,
  SET_DATE_RANGE
} from '../reducer/actions'
import { TimesheetDateRange } from '../types'
import { DateRangePicker } from './DateRangePicker'
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  CalendarCancel,
  CalendarSync,
  CalendarToday,
  Timer
} from './icons'

/**
 * @category Timesheet
 */
export const ActionBar = () => {
  const { t } = useTranslation()
  const { state, dispatch, onSubmitPeriod, onUnsubmitPeriod } =
    useTimesheetContext()

  return (
    <div>
      <Toolbar size='large'>
        <ToolbarButton
          icon={<CalendarToday />}
          onClick={() => {
            dispatch(
              SET_DATE_RANGE(
                new TimesheetDateRange(new Date(), state.dateRangeType)
              )
            )
          }}
          disabled={state.dateRange.isCurrent || !!state.loading}
        />
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
        <ToolbarButton
          icon={<Timer />}
          onClick={() => onSubmitPeriod(true)}
          disabled={!!state.loading}
        >
          {t('timesheet.forecastHoursText')}
        </ToolbarButton>
        <ToolbarButton
          icon={<CalendarCancel />}
          onClick={() => onUnsubmitPeriod(true)}
          disabled={!!state.loading}
        >
          {t('timesheet.unforecastHoursText')}
        </ToolbarButton>
        <ToolbarButton
          icon={<CalendarSync />}
          onClick={() => onSubmitPeriod(false)}
          disabled={!!state.loading}
        >
          {t('timesheet.confirmHoursText')}
        </ToolbarButton>
        <ToolbarButton
          icon={<CalendarCancel />}
          onClick={() => onUnsubmitPeriod(false)}
          disabled={!!state.loading}
        >
          {t('timesheet.unconfirmHoursText')}
        </ToolbarButton>
      </Toolbar>
    </div>
  )
}
