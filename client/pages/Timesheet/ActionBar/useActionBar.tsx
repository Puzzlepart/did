/* eslint-disable unicorn/prefer-query-selector */
/* eslint-disable tsdoc/syntax */
import { ICommandBarProps } from '@fluentui/react'
import { useToggle } from 'hooks'
import { usePeriodCommands } from './selectPeriodCommands'
import { useNavigateCommands } from './useNavigateCommands'
import { useSubmitCommands } from './useSubmitCommands'
import { useWeekPickerCommand } from './useWeekPickerCommand'

/**
 * @category Timesheet
 */
export function useActionBar() {
  const navigateCommands = useNavigateCommands()
  const submitCommands = useSubmitCommands()
  const periodCommands = usePeriodCommands()
  const [showWeekPicker, toggleWeekPicker] = useToggle(false)
  const { weekPickerCommand, target } = useWeekPickerCommand(toggleWeekPicker)

  const commandBarProps: ICommandBarProps = {
    styles: { root: { padding: 0 } },
    items: [
      ...navigateCommands,
      weekPickerCommand,
      ...periodCommands
    ],
    farItems: [submitCommands]
  }

  return {
    commandBarProps,
    showWeekPicker,
    toggleWeekPicker,
    target
  }
}
