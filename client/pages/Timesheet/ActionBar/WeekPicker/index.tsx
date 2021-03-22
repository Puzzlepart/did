/* eslint-disable tsdoc/syntax */
import {
  Calendar,
  Callout,
  DateRangeType,
  DayOfWeek,
  DirectionalHint,
  FirstWeekOfYear,
  FocusTrapZone
} from 'office-ui-fabric-react'
import React, { useState } from 'react'
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
  const [calendar, setCalendar] = useState(null)
  return (
    <>
      <WeekPickerCommand
        onClick={(event) => setCalendar(event.currentTarget)}
      />
      <Callout
        hidden={!calendar}
        isBeakVisible={false}
        className={styles.root}
        gapSpace={5}
        doNotLayer={false}
        target={calendar}
        directionalHint={DirectionalHint.bottomLeftEdge}
        onDismiss={() => setCalendar(null)}
        setInitialFocus={true}>
        <FocusTrapZone isClickableOutsideFocusTrap={true}>
          <Calendar
            onSelectDate={(date) => {
              dispatch(SET_SCOPE(new TimesheetScope(date)))
              setCalendar(null)
            }}
            firstDayOfWeek={DayOfWeek.Monday}
            strings={
              t('common.calendarStrings', { returnObjects: true }) as any
            }
            showGoToToday={false}
            showWeekNumbers={true}
            firstWeekOfYear={FirstWeekOfYear.FirstFourDayWeek}
            dateRangeType={DateRangeType.Week}
            autoNavigateOnSelection={true}
            value={state.scope.startDate.jsDate}
          />
        </FocusTrapZone>
      </Callout>
    </>
  )
}
