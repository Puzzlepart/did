import { AppContext } from 'AppContext'
import { CommandBar, ICommandBarProps } from 'office-ui-fabric'
import React, { useContext } from 'react'
import { TimesheetContext } from '../'
import styles from './ActionBar.module.scss'
import navigateCommands from './navigateCommands'
import selectPeriodCommands from './selectPeriodCommands'
import submitCommands from './submitCommands'
import { weekPickerCommand } from './WeekPicker'

export const ActionBar = () => {
  const { subscription } = useContext(AppContext)
  const context = useContext(TimesheetContext)
  const commandBarProps: ICommandBarProps = {
    styles: { root: { padding: 0 } },
    items: [...navigateCommands(context), weekPickerCommand(context), ...selectPeriodCommands(context)],
    farItems: [submitCommands(context, subscription)]
  }

  return (
    <div className={styles.root}>
      <CommandBar {...commandBarProps} />
    </div>
  )
}
