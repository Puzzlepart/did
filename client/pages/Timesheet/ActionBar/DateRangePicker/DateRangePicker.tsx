import {
  Calendar,
  CalendarStrings,
  DayOfWeek,
  FirstWeekOfYear
} from '@fluentui/react-calendar-compat'
import {
  Popover,
  PopoverSurface,
  PopoverTrigger,
  ToolbarButton,
  tokens
} from '@fluentui/react-components'
import React from 'react'
import { isBrowser } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { getFluentIcon } from 'utils'
import { useTimesheetContext } from '../../context'
import { SET_DATE_RANGE } from '../../reducer/actions'
import { TimesheetDateRange } from '../../types'
import styles from './DateRangePicker.module.scss'
import { useDateRangePicker } from './useDateRangePicker'

/**
 * @category Timesheet
 */
export const DateRangePicker: StyledComponent = () => {
  const { t } = useTranslation()
  const { state, dispatch } = useTimesheetContext()
  const { triggerText, triggerIcon, open, handleOpenChange } =
    useDateRangePicker()
  return (
    <Popover trapFocus={true} open={open} onOpenChange={handleOpenChange}>
      {triggerText && (
        <PopoverTrigger disableButtonEnhancement>
          <ToolbarButton
            className={DateRangePicker.className}
            disabled={!!state.loading}
            appearance='subtle'
            icon={getFluentIcon(triggerIcon)}
          >
            {triggerText}
          </ToolbarButton>
        </PopoverTrigger>
      )}
      <PopoverSurface>
        <Calendar
          onSelectDate={(date) => {
            dispatch(
              SET_DATE_RANGE(new TimesheetDateRange(date, state.dateRangeType))
            )
            handleOpenChange(undefined, { open: false })
          }}
          firstDayOfWeek={DayOfWeek.Monday}
          strings={
            t('common.calendarStrings', {
              returnObjects: true
            }) as CalendarStrings
          }
          showGoToToday={false}
          showWeekNumbers={true}
          isMonthPickerVisible={isBrowser}
          firstWeekOfYear={FirstWeekOfYear.FirstFourDayWeek}
          dateRangeType={state.dateRangeType}
          value={state.dateRange.startDate.jsDate}
        />
      </PopoverSurface>
    </Popover>
  )
}

DateRangePicker.displayName = 'DateRangePicker'
DateRangePicker.className = styles.dateRangePicker
