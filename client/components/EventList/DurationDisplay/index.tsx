/* eslint-disable tsdoc/syntax */
import { format } from '@fluentui/react'
import $date from 'DateUtils'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ModifiedDuration } from './ModifiedDuration'
import { IDurationDisplayProps } from './types'

/**
 * @category Reusable Component
 */
export const DurationDisplay: FC<IDurationDisplayProps> = ({
  event,
  displayFormat,
  style
}) => {
  const { t } = useTranslation()
  let originalValue = null
  let displayValue = $date.getDurationString(event.duration, t)
  if (displayFormat) displayValue = format(displayFormat, displayValue)
  if (event['_originalDuration']) {
    originalValue = $date.getDurationString(event['_originalDuration'], t)
  }
  return (
    <span style={style}>
      {displayValue}
      {event['_originalDuration'] && (
        <ModifiedDuration displayValue={displayValue} originalValue={originalValue} />
      )}
    </span>
  )
}
