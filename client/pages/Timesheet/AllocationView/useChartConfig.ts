import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { IChartConfig } from './types'

/**
 * Hook for chart configuration
 */
export function useChartConfig(): IChartConfig[] {
  const { t } = useTranslation()
  return useMemo(
    () => [
      {
        key: 'project',
        title: t('timesheet.allocation.projectChartTitle'),
        subTitle: t('timesheet.allocation.projectChartDescription'),
        colors: 'light',
        idKey: 'name',
        valueKey: 'duration',
        valuePostfix: t('common.hours'),
        textKey: 'name',
        subTextKey: 'customer.name'
      },
      {
        key: 'customer',
        title: t('timesheet.allocation.customerChartTitle'),
        subTitle: t('timesheet.allocation.customerChartDescription'),
        colors: 'light',
        idKey: 'name',
        valueKey: 'duration',
        valuePostfix: t('common.hours'),
        textKey: 'name'
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}
