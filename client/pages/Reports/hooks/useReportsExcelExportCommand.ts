import { useExcelExportWithProgress } from '../../../hooks/excel/useExcelExportWithProgress'
import { useTranslation } from 'react-i18next'
import { useReportsContext } from '../context'
import { IReportsListProps } from '../ReportsList/types'
import { useColumns } from '../ReportsList/columns/useColumns'
import _ from 'lodash'
import { IListColumn, ListCommandBarItem, ListFilterState } from 'components/List/types'
import report_custom from 'pages/Reports/queries/report-custom.gql'

type PersistedColumn = {
  key: string
  hidden: boolean
}

const PERSISTED_COLUMNS_KEY = 'reportslist_columns'

/**
 * Read persisted column state directly from localStorage.
 * This avoids stale React state from `useBrowserStorage` which
 * only reads once at mount time.
 */
function readPersistedColumns(): PersistedColumn[] {
  try {
    const raw = window.localStorage.getItem(PERSISTED_COLUMNS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/**
 * Apply persisted column visibility and ordering to column definitions.
 */
function applyPersistedColumns(
  columns: IListColumn[],
  persisted: PersistedColumn[]
): IListColumn[] {
  if (_.isEmpty(persisted)) return columns
  return [...columns]
    .sort((a, b) => {
      const aIndex = persisted.findIndex((c) => c.key === a.key)
      const bIndex = persisted.findIndex((c) => c.key === b.key)
      return aIndex - bIndex
    })
    .map((column) => {
      const persistedColumn = persisted.find((c) => c.key === column.key)
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

  const appliedFilterQuery = buildFilterQuery(context.state?.appliedFilterState)
  const hasAppliedFilters = Object.keys(appliedFilterQuery).length > 0
  const supportsQueryFilters = [
    'last_month',
    'current_month',
    'last_year',
    'current_year'
  ].includes(context.queryPreset?.id)

  /**
   * Build export columns by reading persisted state fresh from localStorage
   * every time. This ensures changes made in the ViewColumnsPanel are
   * always reflected in the export, even without a page reload.
   */
  const getExportColumns = () => {
    const persisted = readPersistedColumns()
    return applyPersistedColumns(columns, persisted)
  }

  // For the progress-based export hook we still need a static columns value
  // at render time. Read fresh from localStorage each render.
  const exportColumns = applyPersistedColumns(columns, readPersistedColumns())

  // Determine if this is a large dataset query
  const isLargeDataset = ['current_year', 'last_year'].includes(
    context.queryPreset?.id
  )

  const exportQuery = context.queryPreset?.query || report_custom
  const { exportAllData, progress, progressMessage, isExporting } =
    useExcelExportWithProgress({
      query: exportQuery,
      queryVariables: {
        ...context.queryPreset?.variables,
        ...(supportsQueryFilters &&
          hasAppliedFilters && { query: appliedFilterQuery })
      },
      fileName:
        context.queryPreset?.exportFileName ||
        props.exportFileName ||
        'TimeEntries-{0}.xlsx',
      columns: exportColumns.filter((col) => !col?.data?.hidden),
      isLargeDataset,
      batchSize: 5000,
      presetId: context.queryPreset?.id // Pass preset ID to generate correct query parameters
    })

  // For custom queries (no queryPreset), provide a direct export using
  // already-loaded items instead of re-fetching from the server.
  const onDirectExport = async () => {
    const items = props.items ?? []
    if (items.length === 0) return
    // Read fresh from localStorage at export time
    const freshColumns = getExportColumns().filter(
      (col) => !col?.data?.hidden
    )
    const { exportExcel } = await import('utils/exportExcel')
    const format = (await import('string-format')).default
    const formattedFileName = format(
      props.exportFileName || 'TimeEntries-Custom-{0}.xlsx',
      new Date().toDateString().split(' ').join('-')
    )
    await exportExcel(items, {
      columns: freshColumns,
      fileName: formattedFileName
    })
  }

  const isCustomQuery = !context.queryPreset
  const hasItems = (props.items ?? []).length > 0

  const commandBarItem: ListCommandBarItem = isCustomQuery
    ? (hasItems
      ? {
          key: 'EXPORT_TO_EXCEL_DIRECT',
          text: t('reports.exportToExcel'),
          onClick: onDirectExport,
          disabled: false,
          iconName: 'ExcelDocument'
        }
      : undefined)
    : {
        key: 'EXPORT_TO_EXCEL_PROGRESS',
        text: isExporting ? progressMessage : t('reports.exportToExcel'),
        onClick: () => {
          exportAllData()
        },
        disabled: isExporting,
        iconName: isExporting ? 'Progress' : 'ExcelDocument'
      }

  return {
    commandBarItem,
    progress: isCustomQuery ? null : progress,
    progressMessage: isCustomQuery ? '' : progressMessage,
    isExporting: isCustomQuery ? false : isExporting,
    exportAllData: isCustomQuery ? onDirectExport : exportAllData
  }
}
