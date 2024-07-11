import { ToolbarButton } from '@fluentui/react-components'
import React, { FC } from 'react'
import { useWorkWeekStatus } from './useWorkWeekStatus'

/**
 * Renders a `ToolbarButton` that displays the plus or minus hours for
 * the current work week.
 *
 * @returns A `ToolbarButton` with the plus or minus hours for the current work week.
 *
 * @category Timesheet
 */
export const WorkWeekStatus: FC = () => {
  const { text, background } = useWorkWeekStatus()
  if(!text) return null
  return (
    <ToolbarButton style={{ marginLeft: 15, background, color: 'white' }}>
      {text}
    </ToolbarButton>
  )
}

WorkWeekStatus.displayName = 'WorkWeekStatus'