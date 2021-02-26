import React, { useContext } from 'react'
import FadeIn from 'react-fade-in'
import { useTranslation } from 'react-i18next'
import { WeekPicker } from '.'
import { TimesheetContext } from '../../context'
import styles from './WeekPicker.module.scss'

export function useWeekPickerCommand() {
  const { t } = useTranslation()
  const context = useContext(TimesheetContext)
  return {
    key: 'WEEK_PICKER_COMMAND',
    onRender: () => {
      return (
        <>
          <WeekPicker />
          {context.periods.length === 1 && !context.loading && (
            <FadeIn className={styles.weekNumber}>{context.selectedPeriod.getName(t)}</FadeIn>
          )}
        </>
      )
    }
  }
}
