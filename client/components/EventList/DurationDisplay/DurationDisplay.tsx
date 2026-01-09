import $date from 'DateUtils'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ModifiedDuration } from './ModifiedDuration'
import { IDurationDisplayProps } from './types'

/**
 * @category Reusable Component
 */
export const DurationDisplay: FC<IDurationDisplayProps> = (props) => {
  const { t } = useTranslation()
  let displayValue = $date.getDurationString(props.event.duration, t)
  if (props.displayFormat) {
    // Replace format placeholders with values
    displayValue = props.displayFormat.replace('{0}', displayValue)
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
