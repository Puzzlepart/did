import { IContextualMenuItem } from 'office-ui-fabric'
import * as React from 'react'
import FadeIn from 'react-fade-in'
import { WeekPicker } from '.'
import { ITimesheetContext } from '../../context'
import styles from './WeekPicker.module.scss'

export default ({ loading, selectedPeriod, periods, t }: ITimesheetContext): IContextualMenuItem => ({
  key: 'WEEK_PICKER_COMMAND',
  onRender: () => {
    return (
      <>
        <WeekPicker />
        {periods.length === 1 && !loading && <FadeIn className={styles.weekNumber}>{selectedPeriod.getName(t)}</FadeIn>}
      </>
    )
  }
})
