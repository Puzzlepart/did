import { Tooltip } from '@fluentui/react-components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ModifiedDuration.module.scss'
import { Icon, IModifiedDurationProps } from './types'
import { useModifiedDuration } from './useModifiedDuration'

export const ModifiedDuration: FC<IModifiedDurationProps> = (props) => {
  const { t } = useTranslation()
  const { modifiedDuration, originalDuration, isAdjusted } =
    useModifiedDuration(props)
  if (!isAdjusted) return <>{props.children}</>
  return (
    <Tooltip
      withArrow={true}
      relationship='description'
      content={
        <div>
          <div className={styles.header}>
            {t('timesheet.eventDurationModifiedTitle')}
          </div>
          <div className={styles.content}>
            <div className={styles.icon}>
              <Icon />
            </div>
            <div>
              {t('timesheet.eventDurationModifiedMessage', {
                modifiedDuration,
                originalDuration
              })}
            </div>
          </div>
        </div>
      }
    >
      <div className={styles.root}>
        {props.children}
        <Icon className={styles.icon} />
      </div>
    </Tooltip>
  )
}
