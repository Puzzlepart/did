import { CheckboxControl, InputControl } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CONFIG_KEYS } from '../types'
import { UserSettingsTabComponent } from './types'
import styles from './UserSettingsTabComponent.module.scss'

export const Timesheet: UserSettingsTabComponent = ({ register }) => {
  const { t } = useTranslation()
  return (
    <div className={styles.container}>
      <InputControl
        {...register(CONFIG_KEYS.workWeekHours)}
        label={t('common.workWeekHoursLabel')}
        description={t('common.workWeekHoursDescription')}
        type='number'
      />
      <CheckboxControl
        {...register(CONFIG_KEYS.timesheetRoundUpEvents)}
        label={t('common.roundUpEventsLabel')}
        description={t('common.roundUpEventsDescription')}
      />
    </div>
  )
}
