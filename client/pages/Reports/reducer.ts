import { QueryResult } from '@apollo/client'
import { createAction, createReducer, current } from '@reduxjs/toolkit'
import { IFilter } from 'components/FilterPanel'
import { IListGroups } from 'components/List/types'
import { getValue } from 'helpers'
import { filter, find } from 'underscore'
import { IReportsParams, IReportsQuery, IReportsSavedFilter, IReportsState } from './types'

export const INIT = createAction('INIT')
export const TOGGLE_FILTER_PANEL = createAction('TOGGLE_FILTER_PANEL')
export const DATA_UPDATED = createAction<{ query: QueryResult }>('DATA_UPDATED')
export const FILTERS_UPDATED = createAction<{ filters: IFilter[] }>('FILTERS_UPDATED')
export const CHANGE_QUERY = createAction<{ key: string }>('FILTER_UPDATED')
export const SET_GROUP_BY = createAction<{ groupBy: IListGroups }>('SET_GROUP_BY')
export const SET_FILTER = createAction<{ filter: IReportsSavedFilter }>('SET_FILTER')
export const ADD_FILTER = createAction<{ name: string }>('ADD_FILTER')
export const REMOVE_SELECTED_FILTER = createAction('REMOVE_SELECTED_FILTER')

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
        state.savedFilters = JSON.parse(localStorage.saved_filters || '[]')
      },

      [SET_FILTER.type]: (state, { payload }: ReturnType<typeof SET_FILTER>) => {
        state.filter = payload.filter
        state.subset = filter(state.timeentries, (entry) => {
          return (
            filter(Object.keys(payload.filter.values), (key) => {
              return payload.filter.values[key].indexOf(getValue(entry, key, '')) !== -1
            }).length === Object.keys(payload.filter.values).length
          )
        })
      },

      [ADD_FILTER.type]: (state, { payload }: ReturnType<typeof ADD_FILTER>) => {
        const newFilter = { ...state.filter, name: payload.name }
        state.savedFilters.push(newFilter)
        localStorage.setItem('saved_filters', JSON.stringify(current(state).savedFilters))
        state.filter = newFilter
      },

      [REMOVE_SELECTED_FILTER.type]: (state) => {
        const index = current(state).savedFilters.indexOf(current(state).filter)
        state.savedFilters.splice(index, 1)
        localStorage.setItem('saved_filters', JSON.stringify(current(state).savedFilters))
        state.filter = null
        state.subset = state.timeentries
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
        state.filter = {
          values: payload.filters.reduce((obj, f) => ({
            ...obj,
            [f.key]: f.selected.map(i => i.key)
          }), {})
        }
        state.subset = filter(state.timeentries, (entry) => {
          return (
            filter(payload.filters, (f) => {
              const selectedKeys = f.selected.map((s) => s.key)
              return selectedKeys.indexOf(getValue(entry, f.key, '')) !== -1
            }).length === payload.filters.length
          )
        })
        state.isFiltered = state.subset.length !== state.timeentries.length
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
