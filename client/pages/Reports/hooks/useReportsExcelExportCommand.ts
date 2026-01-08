import { ICommandBarItemProps } from '@fluentui/react'
import { useExcelExportWithProgress } from '../../../hooks/excel/useExcelExportWithProgress'
import { useTranslation } from 'react-i18next'
import { useReportsContext } from '../context'
import { IReportsListProps } from '../ReportsList/types'
import { useColumns } from '../ReportsList/columns/useColumns'
import { useBrowserStorage } from 'hooks'
import _ from 'lodash'
import { ListFilterState } from 'components/List/types'
import report_custom from 'pages/Reports/queries/report-custom.gql'

type PersistedColumn = {
  key: string
  hidden: boolean
}

function buildFilterQuery(filterState?: ListFilterState) {
  const filters = filterState?.filters ?? []
  if (filters.length === 0) return {}

  const filter = filters[0]
  const values = Array.from(filter.selected ?? [])

  if (values.length === 0) return {}

  switch (filter.key) {
    case 'project.name': {
      return { projectNames: values }
    }
    case 'project.parent.name': {
      return { parentProjectNames: values }
    }
    case 'customer.name': {
      return { customerNames: values }
    }
    case 'partner.name': {
      return { partnerNames: values }
    }
    case 'resource.displayName': {
      return { employeeNames: values }
    }
    default: {
      return {}
    }
  }
}

/**
 * Enhanced Excel export command for Reports with progress tracking
 * and support for loading all data across multiple batches
 */
export function useReportsExcelExportCommand(props: IReportsListProps) {
  const { t } = useTranslation()
  const context = useReportsContext()
  const columns = useColumns()
  const [persistedColumns] = useBrowserStorage<PersistedColumn[]>({
    key: 'reportslist_columns',
    initialValue: []
  })

  const appliedFilterQuery = buildFilterQuery(context.state?.appliedFilterState)
  const hasAppliedFilters = Object.keys(appliedFilterQuery).length > 0
  const supportsQueryFilters = [
    'last_month',
    'current_month',
    'last_year',
    'current_year'
  ].includes(context.queryPreset?.id)

  const exportColumns = _.isEmpty(persistedColumns)
    ? columns
    : [...columns]
        .sort((a, b) => {
          const aIndex = persistedColumns.findIndex((c) => c.key === a.key)
          const bIndex = persistedColumns.findIndex((c) => c.key === b.key)
          return aIndex - bIndex
        })
        .map((column) => {
          const persistedColumn = persistedColumns.find((c) => c.key === column.key)
          return {
            ...column,
            data: {
              ...column.data,
              hidden:
                persistedColumn === undefined
                  ? column?.data?.hidden
                  : persistedColumn.hidden
            }
          }
        })

  // Determine if this is a large dataset query
  const isLargeDataset = [
    'current_year',
    'last_year'
  ].includes(context.queryPreset?.id)

  const exportQuery = context.queryPreset?.query || report_custom
  const { exportAllData, progress, progressMessage, isExporting } = useExcelExportWithProgress({
    query: exportQuery,
    queryVariables: {
      ...context.queryPreset?.variables,
      ...(supportsQueryFilters && hasAppliedFilters && { query: appliedFilterQuery })
    },
    fileName: context.queryPreset?.exportFileName || props.exportFileName || 'TimeEntries-{0}.xlsx',
    columns: exportColumns.filter((col) => !col?.data?.hidden),
    isLargeDataset,
    batchSize: 5000,
    presetId: context.queryPreset?.id  // Pass preset ID to generate correct query parameters
  })

  if (!context.queryPreset) {
    return {
      commandBarItem: undefined,
      menuItem: undefined,
      progress: null,
      progressMessage: ''
    }
  }

  const commandBarItem: ICommandBarItemProps = {
    key: 'EXPORT_TO_EXCEL_PROGRESS',
    text: isExporting ? progressMessage : t('reports.exportToExcel'),
    onClick: () => {
      exportAllData()
    },
    disabled: isExporting,
    iconProps: {
      iconName: isExporting ? 'Progress' : 'ExcelDocument',
      styles: { root: { color: isExporting ? '#0078d4' : 'green' } }
    }
  }

  return {
    commandBarItem,
    progress,
    progressMessage,
    isExporting,
    exportAllData
  }
}
