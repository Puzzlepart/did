import { Icon, TooltipHost } from '@fluentui/react'
import $date, { DurationStringFormat } from 'DateUtils'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ModifiedDuration.module.scss'
import { IModifiedDurationProps } from './types'

export const ModifiedDuration: FC<IModifiedDurationProps> = (props) => {
  const { t } = useTranslation()
  if (!props.event['adjustedMinutes']) return <>{props.children}</>
  const originalDuration = $date.getDurationString(
    props.event['originalDuration'],
    t,
    DurationStringFormat.Long
  )
  const modifiedDuration = $date.getDurationString(
    props.event.duration,
    t,
    DurationStringFormat.Long
  )
  return (
    <TooltipHost
      hostClassName={styles.host}
      className={styles.root}
      content={
        <div className={styles.content}>
          <Icon {...props.iconProps} />
          <span>
            {t('timesheet.eventDurationModifiedMessage', {
              modifiedDuration,
              originalDuration
            })}
          </span>
        </div>
      }
    >
      {props.children}
      <Icon {...props.iconProps} />
    </TooltipHost>
  )
}

ModifiedDuration.defaultProps = {
  iconProps: {
    className: styles.icon,
    iconName: 'SortUp'
  }
}
