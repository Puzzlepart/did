import { AppContext } from 'AppContext'
import { useContext, useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { IReportsParams, IReportsQuery } from '..'
import createReducer from '../reducer'

/**
 * Use Reports reducer
 *
 * @param {IReportsQuery[]} queries Queries
 */
export function useReportsReducer(queries: IReportsQuery[]) {
  const { t } = useTranslation()
  const app = useContext(AppContext)
  const url = useParams<IReportsParams>()
  const reducer = useMemo(() => createReducer({ app, url, queries }), [])
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    timeentries: [],
    savedFilters: {},
    groupBy: {
      fieldName: '.',
      emptyGroupName: t('common.all')
    }
  })
  return { state, dispatch }
}
