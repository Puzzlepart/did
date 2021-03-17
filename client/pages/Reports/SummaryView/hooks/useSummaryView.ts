/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { useContext } from 'react'
import { ReportsContext } from '../../context'
import { useColumns } from './useColumns'
import { useRows } from './useRows'

/**
 * Hook for SummaryView
 *
 * @category SummaryView
 */
export function useSummaryView({ onColumnRender }) {
  const { state } = useContext(ReportsContext)
  const columns = useColumns({ onRender: onColumnRender })

  const rows = useRows(state)

  return {
    state,
    rows,
    columns
  }
}
