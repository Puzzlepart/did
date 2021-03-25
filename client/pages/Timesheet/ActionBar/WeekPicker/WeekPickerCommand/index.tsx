/* eslint-disable tsdoc/syntax */
/* eslint-disable react/jsx-no-undef */
import { Icon, TextField } from '@fluentui/react-react'
import React, { HTMLAttributes } from 'react'
import { BrowserView, isMobile, MobileView } from 'react-device-detect'
import FadeIn from 'react-fade-in'
import { useTranslation } from 'react-i18next'
import { useTimesheetContext } from '../../../context'
import styles from './WeekPickerCommand.module.scss'

/**
 * @category Timesheet
 */
export const WeekPickerCommand = ({ onClick }: HTMLAttributes<any>) => {
  const { t } = useTranslation()
  const { state } = useTimesheetContext()
  const showWeekNumber =
    state.periods.length === 1 && !state.loading && !isMobile
  return (
    <>
      <MobileView viewClassName={`${styles.root} ${styles.mobile}`}>
        <Icon iconName='Calendar' onClick={onClick} />
      </MobileView>
      <BrowserView>
        <TextField
          className={styles.root}
          onClick={onClick}
          value={state.scope.timespan}
          styles={{
            field: {
              color: 'rgb(120, 120, 120)',
              cursor: !state.loading && 'pointer'
            },
            root: {
              width: 180,
              marginTop: 6
            }
          }}
          readOnly
          borderless
          iconProps={{
            iconName: 'ChevronDown',
            className: styles.actionBarIcon
          }}
        />
      </BrowserView>
      {showWeekNumber && (
        <FadeIn className={styles.weekNumber}>
          {state.selectedPeriod.getName(t)}
        </FadeIn>
      )}
    </>
  )
}
