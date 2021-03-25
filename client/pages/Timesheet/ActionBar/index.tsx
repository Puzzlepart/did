/* eslint-disable tsdoc/syntax */
import {
  CommandBar,
  ICommandBarProps,
  IContextualMenuItem
} from '@fluentui/react-react'
import React from 'react'
import styles from './ActionBar.module.scss'
import { usePeriodCommands } from './selectPeriodCommands'
import { useNavigateCommands } from './useNavigateCommands'
import { useSubmitCommands } from './useSubmitCommands'
import { WeekPicker } from './WeekPicker'

/**
 * @category Timesheet
 */
export const ActionBar = () => {
  const navigateCommands = useNavigateCommands()
  const submitCommands = useSubmitCommands()
  const periodCommands = usePeriodCommands()
  const weekPickerCommand: IContextualMenuItem = {
    key: 'WEEK_PICKER_COMMAND',
    onRender: () => <WeekPicker />
  }

  const commandBarProps: ICommandBarProps = {
    styles: { root: { padding: 0 } },
    items: [...navigateCommands, weekPickerCommand, ...periodCommands],
    farItems: [submitCommands]
  }

  return (
    <div className={styles.root}>
      <CommandBar {...commandBarProps} />
    </div>
  )
}
