/* eslint-disable tsdoc/syntax */
import { IChoiceGroupOption } from 'office-ui-fabric-react'
import { useState } from 'react'
import { useToggle } from '../../../hooks'
import { useQueryPresets } from './query-presets'
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
  const queryPresets = useQueryPresets()
  const query = useUserReportQuery(queryPreset)
  const columns = useColumns()

  return {
    queryPreset,
    setQueryPreset: (_event: any, queryPreset_: IChoiceGroupOption) =>
      setQueryPreset(queryPreset_),
    queryPresets,
    showPanel,
    togglePanel,
    query,
    columns
  }
}
