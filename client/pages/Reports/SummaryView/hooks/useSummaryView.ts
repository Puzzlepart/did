import { useContext } from 'react'
import { ReportsContext } from '../../context'
import { useColumns } from './useColumns'
import { useRows } from './useRows'

/**
 * Component logic hook for SummaryView. Returns all data required for
 * SummaryView component.
 *
 * @category SummaryView
 */
export function useSummaryView() {
  const context = useContext(ReportsContext)
  const columns = useColumns()
  const rows = useRows()
  return {
    ...context,
    rows,
    columns
  }
}
