import { useExcelExport } from 'hooks'
import { useContext } from 'react'
import { ProjectsContext } from '../../context'
import columns from '../columns'
import { useTimeEntriesQuery } from './useTimeEntriesQuery'

/**
 * @category Projects
 */
export function useTimeEntries() {
  const { state } = useContext(ProjectsContext)
  const { loading, error, timeentries } = useTimeEntriesQuery()
  const fileName = `TimeEntries-${state.selected?.tag.replace(
    /\s+/g,
    '-'
  )}-{0}.xlsx`

  const { onExport } = useExcelExport({
    items: timeentries,
    fileName,
    columns
  })

  return {
    loading,
    error,
    onExport,
    timeentries
  } as const
}
