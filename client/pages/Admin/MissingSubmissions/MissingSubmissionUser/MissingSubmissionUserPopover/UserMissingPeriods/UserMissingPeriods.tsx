import { Label } from '@fluentui/react-components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { IUserMissingPeriodsProps } from './types'
import styles from './UserMissingPeriods.module.scss'

export const UserMissingPeriods: StyledComponent<IUserMissingPeriodsProps> = (
  props
) => {
  const { t } = useTranslation()
  if (!props.user.periods) return null
  return (
    <div className={UserMissingPeriods.className}>
      <div>
        <Label weight='semibold'>{t('common.missingWeeksLabel')}</Label>
      </div>
      <div className={styles.container}>
        {props.user.periods.map((p, index) => (
          <div key={index} className={styles.item}>
            {p.name}
          </div>
        ))}
      </div>
    </div>
  )
}

UserMissingPeriods.displayName = 'UserMissingPeriods'
UserMissingPeriods.className = styles.userMissingPeriods
