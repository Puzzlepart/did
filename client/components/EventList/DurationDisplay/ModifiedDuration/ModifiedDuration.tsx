import { Tooltip } from '@fluentui/react-components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
import styles from './ModifiedDuration.module.scss'
import { IModifiedDurationProps } from './types'
import { useModifiedDuration } from './useModifiedDuration'

export const ModifiedDuration: StyledComponent<IModifiedDurationProps> = (
  props
) => {
  const { t } = useTranslation()
  const { modifiedDuration, originalDuration, isAdjusted } =
    useModifiedDuration(props)
  if (!isAdjusted) return <>{props.children}</>
  return (
    <Tooltip
      relationship={props.relationship}
      withArrow={props.withArrow}
      content={
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.icon}>{icon('ArrowSortUp')}</div>
            <div className={styles.title}>
              {t('timesheet.eventDurationModifiedTitle')}
            </div>
          </div>
          <div className={styles.body}>
            {t('timesheet.eventDurationModifiedMessage', {
              modifiedDuration,
              originalDuration
            })}
          </div>
        </div>
      }
    >
      <div className={ModifiedDuration.className}>
        {props.children}
        <div className={styles.icon}>{icon('ArrowSortUp')}</div>
      </div>
    </Tooltip>
  )
}

ModifiedDuration.displayName = 'ModifiedDuration'
ModifiedDuration.className = styles.modifiedDuration
ModifiedDuration.defaultProps = {
  withArrow: true,
  relationship: 'description'
}
