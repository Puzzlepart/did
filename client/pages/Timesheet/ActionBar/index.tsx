/* eslint-disable unicorn/prefer-query-selector */
/* eslint-disable tsdoc/syntax */
import {
  CommandBar,
  ICommandBarProps
} from '@fluentui/react'
import { useToggle } from 'hooks'
import React, { useRef } from 'react'
import { useTimesheetContext } from '../context'
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
  const { state } = useTimesheetContext()
  const [showWeekPicker,toggleWeekPicker] = useToggle(false)
  const target = useRef(null)

  const commandBarProps: ICommandBarProps = {
    styles: { root: { padding: 0 } },
    items: [
      ...navigateCommands,
      {
        key: 'TOGGLE_WEEK_PICKER',
        text: state.scope.timespan,
        componentRef: target,
        onClick: toggleWeekPicker,
        buttonStyles:{
          flexContainer:{
            minWidth:200,
            textAlign:'left'
          }
        }
      },
      ...periodCommands
    ],
    farItems: [submitCommands]
  }

  return (
    <div>
      <CommandBar {...commandBarProps} />
      <WeekPicker
        target={target?.current?._buttonElement?.current}
        hidden={!showWeekPicker}
        onDismiss={toggleWeekPicker}
      />
    </div>
  )
}
