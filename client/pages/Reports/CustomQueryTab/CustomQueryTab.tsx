import { DateControl, FormControl, useFormControlModel, useFormControls, UserPickerControl } from 'components'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IReportsQuery } from '../types'
import styles from './CustomQueryTab.module.scss'
import { default as custom_query } from './report-custom-query.gql'


export function useCustomQuery() {
  const map = useFormControlModel()
  const register = useFormControls(map)
  const { t } = useTranslation()
  const query: IReportsQuery = {
    id: 'customQuery',
    text: t('reports.customQueryHeaderText'),
    icon: 'CalendarWeek',
    hidden: true,
    query: custom_query,
    variables: {
      userQuery: { hiddenFromReports: false },
      query: {}
    }
  } as IReportsQuery

  return {
    map,
    register,
    query
  }
}

export const CustomQueryTab: TabComponent = () => {
  const { t } = useTranslation()
  const { map, register } = useCustomQuery()
  return (
    <div className={CustomQueryTab.className}>
      <FormControl
        model={map}
        register={register}
        submitProps={{
          text: t('reports.customQuerySubmit'),
          onClick: () => {
            alert('Custom query submitted')
          }
        }}>
        <div className={styles.queryOptions}>
          <DateControl
            {...register('startDate')}
            label={t('reports.customQueryStartDate')} />
          <DateControl
            {...register('endDate')}
            label={t('reports.customQueryEndDate')} />
          <UserPickerControl
            {...register('user')}
            label={t('reports.customQueryUser')} />
        </div>
      </FormControl>
    </div>
  )
}

CustomQueryTab.displayName = 'WelcomeTab'
CustomQueryTab.className = styles.customQueryTab
