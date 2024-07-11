import { ToolbarButton } from '@fluentui/react-components'
import { ConditionalWrapper } from 'components'
import React, { FC } from 'react'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
import { Timebank } from './Timebank'
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
  const {
    allPeriodsConfirmed,
    workWeekHoursDiff,
    text,
    background,
    iconName
  } = useWorkWeekStatus()
  if (!text) return null
  return (
    <ConditionalWrapper
      condition={allPeriodsConfirmed}
      wrapper={(children) => (
        // <Timebank hours={workWeekHoursDiff}>{children}</Timebank>
        <div>{children}</div>
      )}
    >
    <ToolbarButton
      style={{
        marginLeft: 15,
        background,
        color: 'white'
      }}
      icon={icon(iconName, { bundle: false })}
    >
      {text}
    </ToolbarButton>
    </ConditionalWrapper >
  )
}

WorkWeekStatus.displayName = 'WorkWeekStatus'
