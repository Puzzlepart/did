import { DateField, FormControl, useFormControlModel, useFormControls } from 'components'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import styles from './CustomQueryTab.module.scss'
import { useTranslation } from 'react-i18next'
import { UserPicker } from 'components/FormControl/UserPickerControl/UserPicker'

export const CustomQueryTab: TabComponent = () => {
  const { t } = useTranslation()
  const map = useFormControlModel()
  const register = useFormControls(map)
  // eslint-disable-next-line no-console
  console.log(map)
  return (
    <div className={CustomQueryTab.className}>
      <FormControl className={styles.queryOptions} model={map} register={register}>
        <DateField label={t('reports.customQueryStartDate')} />
        <DateField label={t('reports.customQueryEndDate')} />
        <UserPicker label={t('reports.customQueryUser')} />
      </FormControl>
    </div>
  )
}

CustomQueryTab.displayName = 'WelcomeTab'
CustomQueryTab.className = styles.customQueryTab
