import { useExcelExport } from 'hooks'
import { useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import { useQueries } from './queries'
import { useColumns } from './useColumns'
import { useUserReportQuery } from './useUserReportQuery'

/**
 * Hook for UserReports
 *
 * @category UserReports Hooks
 */
export function useUserReports() {
  const [preset, setPreset] = useState<any>(null)
  const panelState = useBoolean(false)
  const queries = useQueries()
  const query = useUserReportQuery(preset)
  const columns = useColumns()

  const { onExport } = useExcelExport({
    items: query?.data,
    fileName: preset?.exportFileName,
    columns
  })

  return {
    preset,
    setPreset,
    queries,
    panelState,
    query,
    onExport
  }
}
