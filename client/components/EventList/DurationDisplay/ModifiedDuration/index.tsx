import { Icon, TooltipHost } from '@fluentui/react'
import $date from 'DateUtils'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ModifiedDuration.module.scss'
import { IModifiedDurationProps } from './types'

export const ModifiedDuration: FC<IModifiedDurationProps> = (props) => {
  const { t } = useTranslation()
  const originalDuration = $date.getDurationString(
    props.event['_originalDuration'],
    t,
    'LongFormat'
  )
  const modifiedDuration = $date.getDurationString(
    props.event.duration,
    t,
    'LongFormat'
  )
  return (
    <TooltipHost
      hostClassName={styles.host}
      className={styles.root}
      content={
        <div className={styles.content}>
          <Icon className={styles.icon} iconName='DoubleChevronUp' />
          {t('timesheet.eventDurationModifiedMessage', {
            modifiedDuration,
            originalDuration
          })}
        </div>
      }
    >
      <Icon className={styles.icon} iconName='DoubleChevronUp' />
    </TooltipHost>
  )
}
