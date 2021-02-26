import { CommandBar, ICommandBarProps } from 'office-ui-fabric'
import React from 'react'
import styles from './ActionBar.module.scss'
import { usePeriodCommands } from './selectPeriodCommands'
import { useNavigateCommands } from './useNavigateCommands'
import { useSubmitCommands } from './useSubmitCommands'
import { useWeekPickerCommand } from './WeekPicker'

export const ActionBar = () => {
  const navigateCommands = useNavigateCommands()
  const submitCommands = useSubmitCommands()
  const weekPickerCommand  = useWeekPickerCommand()
  const periodCommands = usePeriodCommands()

  const commandBarProps: ICommandBarProps = {
    styles: { root: { padding: 0 } },
    items: [
      ...navigateCommands,
      weekPickerCommand,
      ...periodCommands
    ],
    farItems: [submitCommands]
  }

  return (
    <div className={styles.root}>
      <CommandBar {...commandBarProps} />
    </div>
  )
}
