/* eslint-disable unicorn/no-array-reduce */
import { IListProps } from 'components/List/types'
import { useTimesheetContext } from '../../context'
import { useColumns } from './useColumns'
import { useRowGenerator } from './useRowGenerator'

/**
 * Component logic for `<SummaryView />`
 *
 * @returns `IListProps`
 *
 * @category Timesheet
 */
export function useSummaryView(): IListProps {
  const { state } = useTimesheetContext()
  const columns = useColumns()
  const { generateRows, generateTotalRow } = useRowGenerator(columns)
  const items = [...generateRows(), generateTotalRow()]
  return {
    enableShimmer: !!state.loading,
    items,
    columns
  }
}
