import { useExcelExport } from 'hooks'
import { useProjectsContext } from '../../context'
import columns from '../columns'
import { useTimeEntriesQuery } from './useTimeEntriesQuery'

/**
 * @category Projects
 */
export function useTimeEntries() {
  const { state } = useProjectsContext()
  const { loading, error, timeEntries } = useTimeEntriesQuery()
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
    timeEntries
  } as const
}
