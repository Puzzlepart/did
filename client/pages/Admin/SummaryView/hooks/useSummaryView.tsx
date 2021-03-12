/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import { useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { first } from 'underscore'
import { reducer } from '../reducer'
import $summary_view from '../summary_view.gql'
import { useColumns } from './useColumns'
import { useRows } from './useRows'
import { useScopes } from './useScopes'

/**
 * @ignore
 */
export function useSummaryView() {
  const scopes = useScopes()
  const [state, dispatch] = useReducer(reducer, {
    users: [],
    periods: [],
    scope: first(scopes)
  })
  const { data, loading } = useQuery($summary_view, {
    fetchPolicy: 'cache-first'
  })

  useEffect(() => {
    dispatch({ type: 'DATA_UPDATED', payload: data })
  }, [data])

  const columns = useColumns()
  const rows = useRows(state)

  return {
    dispatch,
    loading,
    scopes,
    rows,
    columns
  }
}
