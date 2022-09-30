/* eslint-disable tsdoc/syntax */
import { format, Icon, TooltipHost } from '@fluentui/react'
import $date from 'DateUtils'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IDurationDisplayProps } from './types'

/**
 * @category Reusable Component
 */
export const DurationDisplay: React.FC<IDurationDisplayProps> = (
  { event, displayFormat, style }
): JSX.Element => {
  // eslint-disable-next-line no-console
  console.log(event['_originalDuration'])
  const { t } = useTranslation()
  let originalValue = null
  let displayValue = $date.getDurationString(event.duration, t)
  if (displayFormat)
    displayValue = format(displayFormat, displayValue)
  if(event['_originalDuration']) {
    originalValue = $date.getDurationString(event['_originalDuration'], t)
  }
  return (
    <span style={style}>
      {displayValue}
      {event['_originalDuration'] && (
        <TooltipHost content={`Hendelsens varighet har automatisk blitt endret fra ${originalValue} til ${displayValue}. Om du ikke vil at dette skal skje i fremtiden, kan funksjonen skrus av i brukerinnstillinger.`}>
          <Icon style={{ marginLeft: 4 }} iconName='Info' />
        </TooltipHost>
      )}
    </span>
  )
}
