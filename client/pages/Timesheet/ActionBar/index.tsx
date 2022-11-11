/* eslint-disable unicorn/prefer-query-selector */
import { CommandBar } from '@fluentui/react'
import React from 'react'
import { useActionBar } from './useActionBar'
import { WeekPicker } from './WeekPicker'

/**
 * @category Timesheet
 */
export const ActionBar = () => {
  const { commandBarProps, showWeekPicker, toggleWeekPicker, target } =
    useActionBar()

  return (
    <div>
      <CommandBar {...commandBarProps} />
      <WeekPicker
        target={target}
        hidden={!showWeekPicker}
        onDismiss={toggleWeekPicker}
      />
    </div>
  )
}
