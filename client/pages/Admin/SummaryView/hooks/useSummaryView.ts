/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useSummaryViewReducer } from '../reducer'
import $summary_view from '../summary_view.gql'
import { useColumns } from './useColumns'
import { useRows } from './useRows'

/**
 * Hook for SummaryView
 *
 * @category SummaryView
 */
export function useSummaryView({ onColumnRender }) {
  const [state, dispatch] = useSummaryViewReducer()
  const query = useQuery($summary_view, {
    fetchPolicy: 'cache-first',
    variables: {
      userQuery: { hiddenFromReports: false }
    }
  })

  useEffect(() => {
    dispatch({ type: 'DATA_UPDATED', payload: query })
  }, [query.data])

  const columns = useColumns({ onRender: onColumnRender })
  const rows = useRows(state)

  return {
    dispatch,
    state,
    loading: query.loading,
    rows,
    columns
  }
}
