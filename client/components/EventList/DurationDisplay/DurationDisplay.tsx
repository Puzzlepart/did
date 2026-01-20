import $date from 'DateUtils'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
// Note: string-format has identical API to @fluentui/react format function
// Both use {0}, {1}, etc. for positional args and {name} for object properties
import format from 'string-format'
import { ModifiedDuration } from './ModifiedDuration'
import { IDurationDisplayProps } from './types'

/**
 * @category Reusable Component
 */
export const DurationDisplay: FC<IDurationDisplayProps> = (props) => {
  const { t } = useTranslation()
  let displayValue = $date.getDurationString(props.event.duration, t)
  if (props.displayFormat) {
    displayValue = format(props.displayFormat, displayValue)
  }
  return (
    <ModifiedDuration
      event={props.event}
      hidden={!props.showModifiedDurationTooltip}
    >
      <span style={props.style}>{displayValue}</span>
    </ModifiedDuration>
  )
}

DurationDisplay.displayName = 'DurationDisplay'
DurationDisplay.defaultProps = {
  showModifiedDurationTooltip: true
}
