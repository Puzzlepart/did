import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu'
import * as React from 'react'
import { ITimesheetContext } from '../context'
import styles from './ActionBar.module.scss'
import { WeekPicker } from './WeekPicker'

export default ({ selectedPeriod, periods, t }: ITimesheetContext): IContextualMenuItem => ({
    key: 'WEEK_PICKER_COMMAND',
    onRender: () => (
        <>
            <WeekPicker />
            {periods.length === 1 && (
                <span className={styles.weekNumber}>
                    {selectedPeriod.getName(t)}
                </span>
            )}
        </>
    ),
})