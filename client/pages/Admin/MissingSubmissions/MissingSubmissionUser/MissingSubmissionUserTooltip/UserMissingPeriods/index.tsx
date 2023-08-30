import { Label } from '@fluentui/react-components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { IUserMissingPeriodsProps } from './types'
import styles from './UserMissingPeriods.module.scss'

export const UserMissingPeriods: FC<IUserMissingPeriodsProps> = (props) => {
  const { t } = useTranslation()
  if (!props.user.periods) return null
  return (
    <div className={styles.root}>
      <div>
        <Label weight='semibold'>{t('common.missingWeeksLabel')}</Label>
      </div>
      {props.user.periods.map((p) => p.name).join(', ')}
    </div>
  )
}
