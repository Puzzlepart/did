/* eslint-disable tsdoc/syntax */
import { AppContext } from 'AppContext'
import { useContext, useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { IReportsParameters, IReportsQueryPresetItem } from '..'
import createReducer from '../reducer'

/**
 * Use Reports reducer
 *
 * @category Reports Hooks
 *
 * @param queries - Queries
 */
export function useReportsReducer(queries: IReportsQueryPresetItem[]) {
  const { t } = useTranslation()
  const app = useContext(AppContext)
  const url = useParams<IReportsParameters>()
  const reducer = useMemo(() => createReducer({ app, url, queries }), [
    app,
    queries,
    url
  ])
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    timeentries: [],
    savedFilters: null,
    groupBy: {
      fieldName: '.',
      emptyGroupName: t('common.all')
    }
  })
  return { state, dispatch }
}
