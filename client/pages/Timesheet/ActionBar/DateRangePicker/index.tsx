import {
  Calendar,
  Callout,
  DayOfWeek,
  DirectionalHint,
  FirstWeekOfYear,
  FocusTrapZone,
  ICalendarStrings,
  ICalloutProps,
  useTheme
} from '@fluentui/react'
import React, { FC } from 'react'
import { isBrowser } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { SET_DATE_RANGE } from '../../reducer/actions'
import { TimesheetDateRange, useTimesheetContext } from '../../types'

/**
 * @category Timesheet
 */
export const DateRangePicker: FC<ICalloutProps> = (props) => {
  const { t } = useTranslation()
  const { state, dispatch } = useTimesheetContext()
  const { palette } = useTheme()
  return (
    <Callout
      {...props}
      isBeakVisible={false}
      doNotLayer={false}
      gapSpace={5}
      directionalHint={DirectionalHint.bottomAutoEdge}
      setInitialFocus={true}
    >
      <FocusTrapZone isClickableOutsideFocusTrap={true}>
        <Calendar
          onSelectDate={(date) => {
            dispatch(
              SET_DATE_RANGE(new TimesheetDateRange(date, state.dateRangeType))
            )
            props.onDismiss()
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
      </FocusTrapZone>
    </Callout>
  )
}
