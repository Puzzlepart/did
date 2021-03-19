/* eslint-disable tsdoc/syntax */
import { useToggle } from 'hooks'
import { IChoiceGroupOption } from 'office-ui-fabric-react'
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
  const [queryPreset, setQueryPreset] = useState<any>(null)
  const [showPanel, togglePanel] = useToggle()
  const queries = useQueries()
  const query = useUserReportQuery(queryPreset)
  const columns = useColumns()

  return {
    queryPreset,
    setQueryPreset: (_event: any, queryPreset_: IChoiceGroupOption) =>
      setQueryPreset(queryPreset_),
    queries,
    showPanel,
    togglePanel,
    query,
    columns
  }
}
