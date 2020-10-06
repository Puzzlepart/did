import { CommandBar, ICommandBarProps } from 'office-ui-fabric-react/lib/CommandBar'
import React, { useContext } from 'react'
import { TimesheetContext } from '../'
import styles from './ActionBar.module.scss'
import * as commands from './commands'

export const ActionBar = () => {
    const context = useContext(TimesheetContext)
    const commandBarProps: ICommandBarProps = {
        styles: { root: { padding: 0 } },
        items: [
            commands.GO_TO_CURRENT_WEEK(context),
            commands.GO_TO_PREV_WEEK(context),
            commands.GO_TO_NEXT_WEEK(context),
            commands.WEEK_PICKER(context),
            ...commands.SELECT_PERIOD(context),
        ],
        farItems: [
            commands.CONFIRM_ACTIONS(context),
            commands.FORECAST_ACTIONS(context)
        ]
    }

    return (
        <div className={styles.root} hidden={!context.loading && !context.selectedPeriod.isLoaded}>
            <CommandBar {...commandBarProps} />
        </div>
    )
}
