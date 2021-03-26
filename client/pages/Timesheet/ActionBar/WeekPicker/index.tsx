/* eslint-disable tsdoc/syntax */
import {
  Calendar,
  Callout,
  DateRangeType,
  DayOfWeek,
  DirectionalHint,
  FirstWeekOfYear,
  FocusTrapZone,
  ICalendarStrings
} from '@fluentui/react'
import { useToggle } from 'hooks'
import React, { useRef } from 'react'
import { isBrowser } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { SET_SCOPE } from '../../reducer/actions'
import { TimesheetScope, useTimesheetContext } from '../../types'
import styles from './WeekPicker.module.scss'
import { WeekPickerCommand } from './WeekPickerCommand'

/**
 * @category Timesheet
 */
export const WeekPicker: React.FC = () => {
  const { t } = useTranslation()
  const { state, dispatch } = useTimesheetContext()
  const target = useRef(null)
  const [hidden, toggleCalendar] = useToggle(true)
  return (
    <>
      <span style={{ display: 'flex' }} ref={target}>
        <WeekPickerCommand onClick={toggleCalendar} />
      </span>
      <Callout
        hidden={hidden}
        isBeakVisible={false}
        doNotLayer={false}
        className={styles.root}
        gapSpace={5}
        target={target}
        directionalHint={DirectionalHint.bottomLeftEdge}
        onDismiss={toggleCalendar}
        setInitialFocus={true}>
        <FocusTrapZone isClickableOutsideFocusTrap={true}>
          <Calendar
            onSelectDate={(date) => {
              dispatch(SET_SCOPE(new TimesheetScope(date)))
              toggleCalendar()
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
    </>
  )
}
