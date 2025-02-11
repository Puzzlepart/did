import { useExcelExport } from 'hooks'
import { useProjectsContext } from '../../context'
import columns from '../columns'
import { useProjectTimeEntriesQuery } from './useProjectTimeEntriesQuery'

/**
 * Custom logic hook for project time entries. Uses the
 * `useProjectTimeEntriesQuery` hook to fetch time entries.
 * 
 * @category Projects
 */
export function useProjectTimeEntries() {
  const { state } = useProjectsContext()
  const { loading, error, timeEntries, skip } = useProjectTimeEntriesQuery()
  const fileName = `TimeEntries-${state.selected?.tag.replace(
    /\s+/g,
    '-'
  )}-{0}.xlsx`

  const { onExport } = useExcelExport({
    items: timeEntries,
    fileName,
    columns
  })

  return {
    loading,
    error,
    onExport,
    timeEntries,
    skip
  }
}
