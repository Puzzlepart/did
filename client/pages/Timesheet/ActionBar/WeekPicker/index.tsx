/* eslint-disable tsdoc/syntax */
import {
  Calendar,
  Callout,
  DateRangeType,
  DayOfWeek,
  DirectionalHint,
  FirstWeekOfYear,
  FocusTrapZone,
  ICalendarStrings,
  ICalloutProps,
  useTheme
} from '@fluentui/react'
import React from 'react'
import { isBrowser } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { SET_SCOPE } from '../../reducer/actions'
import { TimesheetScope, useTimesheetContext } from '../../types'

/**
 * @category Timesheet
 */
export const WeekPicker: React.FC<ICalloutProps> = (props) => {
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
      setInitialFocus={true}>
      <FocusTrapZone isClickableOutsideFocusTrap={true}>
        <Calendar
          onSelectDate={(date) => {
            dispatch(SET_SCOPE(new TimesheetScope(date)))
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
          dateRangeType={DateRangeType.Week}
          value={state.scope.startDate.jsDate}
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
