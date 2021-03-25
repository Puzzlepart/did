/* eslint-disable tsdoc/syntax */
import $date from 'DateUtils'
import { format } from '@fluentui/react-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IDurationDisplayProps } from './types'

/**
 * @category Function Component
 */
export const DurationDisplay: React.FC<IDurationDisplayProps> = (
  props
): JSX.Element => {
  const { t } = useTranslation()
  let displayValue = $date.getDurationString(props.duration, t)
  if (props.displayFormat)
    displayValue = format(props.displayFormat, displayValue)
  return <span style={props.style}>{displayValue}</span>
}
