import { ICommandBarItemProps } from '@fluentui/react'
import { useExcelExportWithProgress } from '../../../hooks/excel/useExcelExportWithProgress'
import { useTranslation } from 'react-i18next'
import { useReportsContext } from '../context'
import { IReportsListProps } from '../ReportsList/types'
import { useColumns } from '../ReportsList/columns/useColumns'

/**
 * Enhanced Excel export command for Reports with progress tracking
 * and support for loading all data across multiple batches
 */
export function useReportsExcelExportCommand(props: IReportsListProps) {
  const { t } = useTranslation()
  const context = useReportsContext()
  const columns = useColumns()

  // Determine if this is a large dataset query
  const isLargeDataset = [
    'current_year',
    'last_year'
  ].includes(context.queryPreset?.id)

  const { exportAllData, progress, progressMessage, isExporting } = useExcelExportWithProgress({
    query: context.queryPreset?.query,
    queryVariables: context.queryPreset?.variables,
    fileName: context.queryPreset?.exportFileName || props.exportFileName || 'TimeEntries-{0}.xlsx',
    columns,
    isLargeDataset,
    batchSize: 5000
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