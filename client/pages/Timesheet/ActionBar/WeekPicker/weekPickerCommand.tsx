import { IContextualMenuItem } from 'office-ui-fabric'
import * as React from 'react'
import { WeekPicker } from '.'
import { ITimesheetContext } from '../../context'
import styles from './WeekPicker.module.scss'

export default ({ selectedPeriod, periods, t }: ITimesheetContext): IContextualMenuItem => ({
  key: 'WEEK_PICKER_COMMAND',
  onRender: () => {
    return (
      <>
        <WeekPicker />
        {periods.length === 1 && <div className={styles.weekNumber}>{selectedPeriod.getName(t)}</div>}
      </>
    )
  }
})
