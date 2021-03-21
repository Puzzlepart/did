/* eslint-disable tsdoc/syntax */
import $date from 'DateUtils'
import { format } from 'office-ui-fabric-react'
import React, { FC, HTMLProps } from 'react'
import { useTranslation } from 'react-i18next'

export interface IDurationDisplayProps extends HTMLProps<HTMLDivElement> {
  displayFormat?: string
  duration: number
}

/**
 * @category Function Component
 */
export const DurationDisplay: FC<IDurationDisplayProps> = (
  props: IDurationDisplayProps
): JSX.Element => {
  const { t } = useTranslation()
  let displayValue = $date.getDurationString(props.duration, t)
  if (props.displayFormat)
    displayValue = format(props.displayFormat, displayValue)
  return <span style={props.style}>{displayValue}</span>
}
