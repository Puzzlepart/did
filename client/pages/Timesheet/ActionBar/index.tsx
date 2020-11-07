import { AppContext } from 'AppContext'
import { CommandBar, ICommandBarProps } from 'office-ui-fabric-react/lib/CommandBar'
import React, { useContext } from 'react'
import { TimesheetContext } from '../'
import styles from './ActionBar.module.scss'
import navigateCommands from './navigateCommands'
import selectPeriodCommands from './selectPeriodCommands'
import submitCommands from './submitCommands'
import weekPickerCommand from './weekPickerCommand'

export const ActionBar = () => {
    const { subscription } = useContext(AppContext)
    const context = useContext(TimesheetContext)
    const commandBarProps: ICommandBarProps = ({
        styles: { root: { padding: 0 } },
        items: [
            ...navigateCommands(context),
            weekPickerCommand(context),
            ...selectPeriodCommands(context),
        ],
        farItems: [submitCommands(context, subscription)]
    })

    return (
        <div className={styles.root} hidden={!context.loading && !context.selectedPeriod.isLoaded}>
            <CommandBar {...commandBarProps} />
        </div>
    )
}
