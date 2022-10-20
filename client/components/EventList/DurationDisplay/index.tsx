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
export const DurationDisplay: FC<IDurationDisplayProps> = (props) => {
  const { t } = useTranslation()
  let displayValue = $date.getDurationString(props.event.duration, t)
  if (props.displayFormat)
    displayValue = format(props.displayFormat, displayValue)
  return (
    <ModifiedDuration event={props.event}>
      <span style={props.style}>{displayValue}</span>
    </ModifiedDuration>
  )
}
