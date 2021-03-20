/* eslint-disable tsdoc/syntax */
import { useAppContext } from 'AppContext'
import { useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { IReportsParameters, IReportsQuery } from '..'
import createReducer from '../reducer'

/**
 * Use Reports reducer
 *
 * @category Reports Hooks
 *
 * @param queries - Queries
 */
export function useReportsReducer(queries: IReportsQuery[]) {
  const { t } = useTranslation()
  const app = useAppContext()
  const url = useParams<IReportsParameters>()
  const reducer = useMemo(() => createReducer({ app, url, queries }), [
    app,
    queries,
    url
  ])
  return useReducer(reducer, {
    loading: true,
    data: {
      timeEntries: [],
      users: [],
      periods: [],
      projects: []
    },
    subset: [],
    savedFilters: null,
    groupBy: {
      fieldName: '.',
      emptyGroupName: t('common.all')
    }
  })
}
