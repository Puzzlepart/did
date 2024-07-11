import { DropdownControl, InputControl } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CONFIG_KEYS } from '../types'
import { UserSettingsTabComponent } from './types'
import styles from './UserSettingsTabComponent.module.scss'

export const Vacation: UserSettingsTabComponent = ({ register }) => {
  const { t } = useTranslation()
  return (
    <div className={styles.container}>
      <InputControl
        {...register(CONFIG_KEYS.vacationTotalDays)}
        label={t('common.vacationTotalDaysLabel')}
        description={t('common.vacationTotalDaysDescription')}
        type='number'
      />
      <DropdownControl
        {...register(CONFIG_KEYS.vacationCalculationType)}
        label={t('common.vacationCalculationTypeLabel')}
        values={[
          {
            value: 'planned',
            text: t('common.vacationCalculationTypePlanned')
          },
          {
            value: 'confirmed',
            text: t('common.vacationCalculationTypeConfirmed')
          }
        ]}
      />
    </div>
  )
}
