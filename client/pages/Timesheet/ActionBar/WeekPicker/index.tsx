import {
  Calendar,
  Callout,
  DateRangeType,
  FirstWeekOfYear,
  DayOfWeek,
  DirectionalHint,
  FocusTrapZone,
  TextField
} from 'office-ui-fabric'
import { TimesheetContext } from 'pages/Timesheet'
import { SET_SCOPE } from 'pages/Timesheet/reducer/actions'
import { TimesheetScope } from 'pages/Timesheet/types'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './WeekPicker.module.scss'

export const WeekPicker = () => {
  const { t } = useTranslation()
  const { loading, scope, dispatch } = useContext(TimesheetContext)
  const [calendar, setCalendar] = useState(null)
  return (
    <>
      <div>
        <TextField
          className={styles.root}
          onClick={(event) => setCalendar(event.currentTarget)}
          value={scope.timespan}
          styles={{
            field: {
              color: 'rgb(120, 120, 120)',
              cursor: !loading && 'pointer'
            },
            root: {
              width: 280,
              marginTop: 6
            }
          }}
          readOnly
          borderless
          iconProps={{ iconName: 'ChevronDown', className: styles.actionBarIcon }}
        />
      </div>
      {calendar && (
        <Callout
          isBeakVisible={false}
          className={styles.callout}
          gapSpace={5}
          doNotLayer={false}
          target={calendar}
          directionalHint={DirectionalHint.bottomLeftEdge}
          onDismiss={() => setCalendar(null)}
          setInitialFocus={true}>
          <FocusTrapZone isClickableOutsideFocusTrap={true}>
            <Calendar
              onSelectDate={(date) => {
                dispatch(SET_SCOPE({ scope: new TimesheetScope(date) }))
                setCalendar(null)
              }}
              firstDayOfWeek={DayOfWeek.Monday}
              strings={t('common.calendarStrings', { returnObjects: true }) as any}
              showGoToToday={false}
              showWeekNumbers={true}
              firstWeekOfYear={FirstWeekOfYear.FirstFourDayWeek}
              dateRangeType={DateRangeType.Week}
              autoNavigateOnSelection={true}
              value={scope.startDate.jsDate}
            />
          </FocusTrapZone>
        </Callout>
      )}
    </>
  )
}

export { default as weekPickerCommand } from './weekPickerCommand'
