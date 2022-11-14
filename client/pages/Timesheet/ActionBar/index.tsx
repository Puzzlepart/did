/* eslint-disable unicorn/prefer-query-selector */
import { CommandBar } from '@fluentui/react'
import React from 'react'
import { DateRangePicker } from './DateRangePicker'
import { useActionBar } from './useActionBar'

/**
 * @category Timesheet
 */
export const ActionBar = () => {
  const { commandBarProps, showWeekPicker, toggleWeekPicker, target } =
    useActionBar()

  return (
    <div>
      <CommandBar {...commandBarProps} />
      <DateRangePicker
        target={target}
        hidden={!showWeekPicker}
        onDismiss={toggleWeekPicker}
      />
    </div>
  )
}
