import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { IChartConfig } from './types'

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
        loadingText: t('timesheet.allocation.projectChartLoadingText')
      } as IChartConfig,
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
        loadingText: t('timesheet.allocation.customerChartLoadingText')
      } as IChartConfig
    ],
    []
  )
}
