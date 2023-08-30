/* eslint-disable unicorn/prefer-query-selector */
import { DateRangeType, ICommandBarProps } from '@fluentui/react'
import { useToggle } from 'hooks'
import { useTimesheetContext } from '../context'
import { Overview } from '../Views/Overview'
import { useDateRangePickerCommand } from './DateRangePicker/useDateRangePickerCommand'
import { useNavigateCommands } from './useNavigateCommands'
import { useNavigatePeriodsCommands } from './useNavigatePeriodsCommands'
import { useSubmitCommands } from './useSubmitCommands'

/**
 * @category Timesheet
 */
export function useActionBar() {
  const { state } = useTimesheetContext()
  const navigateCommands = useNavigateCommands()
  const submitCommands = useSubmitCommands()
  const navigatePeriodsCommands = useNavigatePeriodsCommands()
  const [showWeekPicker, toggleWeekPicker] = useToggle(false)
  const { dateRangePickerCommands, target } =
    useDateRangePickerCommand(toggleWeekPicker)

  const commandBarProps: ICommandBarProps = {
    styles: { root: { padding: 0 } },
    items: [...navigateCommands, ...dateRangePickerCommands],
    farItems: []
  }

  if (
    state.dateRangeType === DateRangeType.Month &&
    state.selectedView?.id === Overview?.id
  ) {
    commandBarProps.farItems.push(submitCommands)
  }

  if (state.dateRangeType === DateRangeType.Week) {
    commandBarProps.items.push(...navigatePeriodsCommands)
    commandBarProps.farItems.push(submitCommands)
  }

  return {
    commandBarProps,
    showWeekPicker,
    toggleWeekPicker,
    target
  }
}
