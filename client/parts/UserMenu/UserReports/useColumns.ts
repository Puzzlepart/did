import { IListColumn } from 'components'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ExcelColumnType } from 'utils/exportExcel'

export function useColumns() {
  const { t } = useTranslation()
  return useMemo<IListColumn[]>(
    () => [
      {
        key: 'title',
        fieldName: 'title',
        name: t('common.titleLabel'),
        minWidth: 100
      },
      {
        key: 'project',
        fieldName: 'project.name',
        name: t('common.project'),
        minWidth: 100
      },
      {
        key: 'customer',
        fieldName: 'customer.name',
        name: t('common.customer'),
        minWidth: 100
      },
      {
        key: 'duration',
        fieldName: 'duration',
        name: t('common.durationLabel'),
        minWidth: 100
      },
      {
        key: 'startDateTime',
        fieldName: 'startDateTime',
        name: t('common.startTimeLabel'),
        minWidth: 100,
        data: { excelColFormat: 'date' as ExcelColumnType }
      },
      {
        key: 'endDateTime',
        fieldName: 'endDateTime',
        name: t('common.endTimeLabel'),
        minWidth: 100,
        data: { excelColFormat: 'date' as ExcelColumnType }
      },
      {
        key: 'week',
        fieldName: 'week',
        name: t('common.weekLabel'),
        minWidth: 100
      },
      {
        key: 'month',
        fieldName: 'month',
        name: t('common.monthLabel'),
        minWidth: 100,
        data: { excelColFormat: 'monthName' as ExcelColumnType }
      },
      {
        key: 'year',
        fieldName: 'year',
        name: t('common.yearLabel'),
        minWidth: 100
      }
    ],
    []
  )
}
