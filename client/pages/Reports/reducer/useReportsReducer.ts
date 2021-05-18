/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { useAppContext } from 'AppContext'
import { useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import _ from 'underscore'
import createReducer from '.'
import { IReportsParameters, IReportsQuery } from '..'
import { IReportsState } from '../types'

/**
 * Use Reports reducer
 *
 * @category Reports Hooks
 *
 * @param queries - Queries
 */
export function useReportsReducer(queries: IReportsQuery[]) {
  const { t } = useTranslation()
  const { getUserConfiguration } = useAppContext()
  const url = useParams<IReportsParameters>()
  const initialState: IReportsState = {
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
  }
  if (url.query) {
    initialState.preset = _.find(queries, (q) => q.itemKey === url.query)
  }
  initialState.savedFilters = getUserConfiguration('reports.filters') || {}
  const reducer = useMemo(() => createReducer({ initialState, queries }), [])
  return useReducer(reducer, initialState)
}
