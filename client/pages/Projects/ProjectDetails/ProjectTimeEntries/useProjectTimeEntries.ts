import { useExcelExport } from 'hooks'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
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

  const emptyMessage = skip.value && t('projects.noAutomaticTimeEntriesText', { buttonText: t('projects.loadTimeEntriesLabel') })

  return {
    loading: loading || !Boolean(state.selected),
    selected: state.selected,
    error,
    onExport,
    timeEntries,
    skip,
    emptyMessage
  }
}
