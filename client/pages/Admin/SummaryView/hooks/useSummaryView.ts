/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useSummaryViewReducer } from '../reducer'
import $summary_view from '../summary_view.gql'
import { usePeriods } from './usePeriods'
import { useRows } from './useRows'

/**
 * Hook for SummaryView
 *
 * @category SummaryView
 */
export function useSummaryView({ onColumnRender }) {
  const { columns, periods } = usePeriods({ onRender: onColumnRender })
  const [state, dispatch] = useSummaryViewReducer()
  const query = useQuery($summary_view, {
    fetchPolicy: 'cache-first',
    variables: {
      userQuery: { hiddenFromReports: false },
      queries: periods.map(([week, year]) => ({ week, year }))
    }
  })

  useEffect(() => {
    dispatch({ type: 'DATA_UPDATED', payload: query })
  }, [query.data])

  const rows = useRows(state)

  return {
    dispatch,
    state,
    loading: query.loading,
    rows,
    columns
  }
}
