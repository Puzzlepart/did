/* eslint-disable tsdoc/syntax */
import { Label } from '@fluentui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IUserMissingPeriodsProps } from './types'
import styles from './UserMissingPeriods.module.scss'

export const UserMissingPeriods: React.FC<IUserMissingPeriodsProps> = (
  props
) => {
  const { t } = useTranslation()
  if (!props.user.periods) return null
  return (
    <div className={styles.root}>
      <Label>{t('common.missingWeeksLabel')}</Label>
      {props.user.periods.map((p) => p.name).join(', ')}
    </div>
  )
}
