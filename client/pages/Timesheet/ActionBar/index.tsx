import { CommandBar, ICommandBarProps } from 'office-ui-fabric-react/lib/CommandBar'
import React, { useContext } from 'react'
import { TimesheetContext } from '../'
import styles from './ActionBar.module.scss'
import selectPeriodCommands from './selectPeriodCommands'
import submitCommands from './submitCommands'
import weekPickerCommand from './weekPickerCommand'
import navigateCommands from './navigateCommands'

export const ActionBar = () => {
    const context = useContext(TimesheetContext)
    const commandBarProps: ICommandBarProps = ({
        styles: { root: { padding: 0 } },
        items: [
            ...navigateCommands(context),
            weekPickerCommand(context),
            ...selectPeriodCommands(context),
        ],
        farItems: [submitCommands(context)]
    })

    return (
        <div className={styles.root} hidden={!context.loading && !context.selectedPeriod.isLoaded}>
            <CommandBar {...commandBarProps} />
        </div>
    )
}
