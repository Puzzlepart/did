import {
  Calendar,
  DayOfWeek,
  FirstWeekOfYear,
  ICalendarStrings,
  useTheme
} from '@fluentui/react'
import {
  Button,
  Popover,
  PopoverSurface,
  PopoverTrigger
} from '@fluentui/react-components'
import React, { FC } from 'react'
import { isBrowser } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { SET_DATE_RANGE } from '../../reducer/actions'
import { TimesheetDateRange, useTimesheetContext } from '../../types'
import { useDateRangePicker } from './useDateRangePicker'

/**
 * @category Timesheet
 */
export const DateRangePicker: FC = () => {
  const { t } = useTranslation()
  const { state, dispatch } = useTimesheetContext()
  const { palette } = useTheme()
  const { triggerText, open, handleOpenChange } = useDateRangePicker()
  return (
    <Popover trapFocus={true} open={open} onOpenChange={handleOpenChange}>
      {triggerText && (
        <PopoverTrigger disableButtonEnhancement>
          <Button appearance='subtle'>{triggerText}</Button>
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
            }) as ICalendarStrings
          }
          showGoToToday={false}
          showWeekNumbers={true}
          isMonthPickerVisible={isBrowser}
          firstWeekOfYear={FirstWeekOfYear.FirstFourDayWeek}
          dateRangeType={state.dateRangeType}
          value={state.dateRange.startDate.jsDate}
          calendarMonthProps={{
            styles: {
              currentItemButton: {
                color: palette.neutralPrimary
              }
            }
          }}
        />
      </PopoverSurface>
    </Popover>
  )
}
