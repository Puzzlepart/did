import { useExcelExport } from 'hooks'
import { useBoolean } from 'usehooks-ts'
import { useProjectsContext } from '../../context'
import columns from '../columns'
import { useProjectTimeEntriesQuery } from './useProjectTimeEntriesQuery'

/**
 * @category Projects
 */
export function useProjectTimeEntries() {
  const { state } = useProjectsContext()
  const skip = useBoolean(true)
  const { loading, error, timeEntries } = useProjectTimeEntriesQuery(skip.value)
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
