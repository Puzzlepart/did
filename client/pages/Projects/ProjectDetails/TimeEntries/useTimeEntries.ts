/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import { useContext } from 'react'
import { useExcelExport } from '../../../../hooks'
import { ProjectsContext } from '../../context'
import columns from '../columns'
import $timeentries from './timeentries.gql'

/**
 * @category Projects
 */
export function useTimeEntries() {
  const { state } = useContext(ProjectsContext)
  const { loading, error, data } = useQuery($timeentries, {
    variables: {
      query: { projectId: state.selected.tag }
    }
  })
  const fileName = `TimeEntries-${state.selected.tag.replace(
    /\s+/g,
    '-'
  )}-{0}.xlsx`

  const { onExport } = useExcelExport({
    items: data?.timeentries,
    fileName,
    columns
  })

  return {
    loading,
    error,
    data,
    onExport,
    timeentries: data?.timeentries || []
  }
}
