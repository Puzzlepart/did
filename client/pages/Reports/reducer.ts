import { QueryResult } from '@apollo/client'
import { createAction, createReducer } from '@reduxjs/toolkit'
import { IFilter } from 'components/FilterPanel'
import { IListGroups } from 'components/List/types'
import { getValue } from 'helpers'
import { filter, find } from 'underscore'
import { IReportsParams, IReportsQuery, IReportsState } from './types'

export const INIT = createAction('INIT')
export const TOGGLE_FILTER_PANEL = createAction('TOGGLE_FILTER_PANEL')
export const DATA_UPDATED = createAction<{ query: QueryResult }>('DATA_UPDATED')
export const FILTERS_UPDATED = createAction<{ filters: IFilter[] }>('FILTERS_UPDATED')
export const CHANGE_QUERY = createAction<{ key: string }>('FILTER_UPDATED')
export const SET_GROUP_BY = createAction<{ groupBy: IListGroups }>('SET_GROUP_BY')
interface ICreateReducerParams {
  params: IReportsParams
  queries: IReportsQuery[]
}

export default ({ params, queries }: ICreateReducerParams) =>
  createReducer<IReportsState>(
    {},
    {
      [INIT.type]: (state) => {
        state.query = find(queries, (q) => q.key === params.query) as any
      },

      [TOGGLE_FILTER_PANEL.type]: (state) => {
        state.isFiltersOpen = !state.isFiltersOpen
      },

      [DATA_UPDATED.type]: (state, { payload }: ReturnType<typeof DATA_UPDATED>) => {
        state.loading = payload.query.loading
        state.timeentries = payload.query?.data?.timeentries || []
        state.subset = state.timeentries
      },

      [FILTERS_UPDATED.type]: (state, { payload }: ReturnType<typeof FILTERS_UPDATED>) => {
        state.subset = filter(state.timeentries, (entry) => {
          return (
            filter(payload.filters, (f) => {
              const selectedKeys = f.selected.map((s) => s.key)
              return selectedKeys.indexOf(getValue(entry, f.key, '')) !== -1
            }).length === payload.filters.length
          )
        })
      },

      [SET_GROUP_BY.type]: (state, { payload }: ReturnType<typeof SET_GROUP_BY>) => {
        state.groupBy = payload.groupBy
      },

      [CHANGE_QUERY.type]: (state, { payload }: ReturnType<typeof CHANGE_QUERY>) => {
        state.query = find(queries, (q) => q.key === payload.key) as any
        state.subset = null
      }
    }
  )
