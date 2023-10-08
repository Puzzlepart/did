import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { IChartConfig } from './types'
import { Customer, Project } from 'types'

/**
 * Hook for chart configuration
 */
export function useChartConfig() {
  const { t } = useTranslation()
  return useMemo<IChartConfig[]>(
    () => [
      {
        key: 'project',
        title: t('timesheet.allocation.projectChartTitle'),
        subTitle: t('timesheet.allocation.projectChartDescription'),
        luminosity: 'light',
        idKey: 'name',
        valueKey: 'duration',
        valuePostfix: t('common.hours'),
        textKey: 'name',
        secondaryTextKey: 'customer.name',
        teritaryTextKey: 'description',
        loadingText: t('timesheet.allocation.projectChartLoadingText'),
        getUrl: (project) => {
          return `/projects/${project.tag.split(' ').join('_')}`
        }
      } as IChartConfig<Project>,
      {
        key: 'customer',
        title: t('timesheet.allocation.customerChartTitle'),
        subTitle: t('timesheet.allocation.customerChartDescription'),
        luminosity: 'light',
        idKey: 'name',
        valueKey: 'duration',
        valuePostfix: t('common.hours'),
        textKey: 'name',
        teritaryTextKey: 'description',
        loadingText: t('timesheet.allocation.customerChartLoadingText'),
        getUrl: (item) => `/customers/${item.key}`
      } as IChartConfig<Customer>
    ],
    []
  )
}
