import { Label } from '@fluentui/react-components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import styles from './UserMissingPeriods.module.scss'
import { IUserMissingPeriodsProps } from './types'

export const UserMissingPeriods: StyledComponent<IUserMissingPeriodsProps> = (props) => {
  const { t } = useTranslation()
  if (!props.user.periods) return null
  return (
    <div className={UserMissingPeriods.className}>
      <div>
        <Label weight='semibold'>{t('common.missingWeeksLabel')}</Label>
      </div>
      {props.user.periods.map((p) => p.name).join(', ')}
    </div>
  )
}

UserMissingPeriods.displayName = 'UserMissingPeriods'
UserMissingPeriods.className = styles.userMissingPeriods