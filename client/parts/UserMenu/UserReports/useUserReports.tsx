import { useToggle } from 'hooks'
import { useState } from 'react'
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
  const [showPanel, togglePanel] = useToggle()
  const queries = useQueries()
  const query = useUserReportQuery(preset)
  const columns = useColumns()

  return {
    preset,
    setPreset,
    queries,
    showPanel,
    togglePanel,
    query,
    columns
  }
}
