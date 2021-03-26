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
  ICalloutProps
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
          strings={t<ICalendarStrings>('common.calendarStrings', {
            returnObjects: true
          })}
          showGoToToday={false}
          showWeekNumbers={true}
          isMonthPickerVisible={isBrowser}
          firstWeekOfYear={FirstWeekOfYear.FirstFourDayWeek}
          dateRangeType={DateRangeType.Week}
          value={state.scope.startDate.jsDate}
        />
      </FocusTrapZone>
    </Callout>
  )
}
