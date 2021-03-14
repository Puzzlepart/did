import { createReducer, current } from '@reduxjs/toolkit'
import get from 'get-value'
import { getValue } from 'helpers'
import { filter, find, omit } from 'underscore'
import { IReportsState } from '../types'
import {
  ADD_FILTER,
  CHANGE_QUERY,
  CLEAR_FILTERS,
  DATA_UPDATED,
  FILTERS_UPDATED,
  INIT,
  REMOVE_SELECTED_FILTER,
  SET_FILTER,
  SET_GROUP_BY,
  TOGGLE_FILTER_PANEL
} from './actions'
import { IReportsReducerParameters } from './types'

/**
 * Creating reducer for Reports using reduxjs/toolkit
 */
export default ({ app, url, queries }: IReportsReducerParameters) =>
  createReducer<IReportsState>({}, (builder) =>
    builder
      .addCase(INIT, (state) => {
        state.preset = find(queries, (q) => q.key === url.query) as any
        state.savedFilters = get(app.user.configuration, 'reports.filters', {
          default: {}
        })
      })
      .addCase(DATA_UPDATED, (state, { payload }) => {
        state.loading = payload.query.loading
        if (payload.query?.data) {
          state.data = { ...state.data, ...payload.query.data }
          state.subset = state.data.time_entries
        }
      })
      .addCase(SET_FILTER, (state, { payload }) => {
        state.filter = payload.filter as any
        state.subset = filter(state.data?.time_entries, (entry) => {
          return (
            filter(Object.keys(payload.filter.values), (key) => {
              return payload.filter.values[key].includes(
                getValue(entry, key, '')
              )
            }).length === Object.keys(payload.filter.values).length
          )
        })
        state.isFiltered =
          state.subset.length !== state.data?.time_entries?.length
      })
      .addCase(ADD_FILTER, (state, { payload }) => {
        const newFilter: any = {
          ...current(state).filter,
          ...payload.model
        }
        state.savedFilters = {
          ...state.savedFilters,
          [newFilter.key]: newFilter
        }
        state.filter = newFilter
      })
      .addCase(REMOVE_SELECTED_FILTER, (state) => {
        state.savedFilters = omit(state.savedFilters, state.filter.key)
        state.filter = null
        state.subset = state.data?.time_entries
        state.isFiltered = false
      })
      .addCase(TOGGLE_FILTER_PANEL, (state) => {
        state.isFiltersOpen = !state.isFiltersOpen
      })
      .addCase(FILTERS_UPDATED, (state, { payload }) => {
        state.filter = {
          key: null,
          values: payload.filters.reduce(
            (object, f) => ({
              ...object,
              [f.key]: f.selected.map((index) => index.key)
            }),
            {}
          )
        }
        state.subset = filter(state.data?.time_entries, (entry) => {
          return (
            filter(payload.filters, (f) => {
              const selectedKeys = f.selected.map((s) => s.key)
              return selectedKeys.includes(getValue(entry, f.key, ''))
            }).length === payload.filters.length
          )
        })
        state.isFiltered =
          state.subset.length !== state.data?.time_entries?.length
      })
      .addCase(SET_GROUP_BY, (state, { payload }) => {
        state.groupBy = payload.groupBy
      })
      .addCase(CHANGE_QUERY, (state, { payload }) => {
        state.preset = find(queries, (q) => q.key === payload.key) as any
        state.subset = null
      })
      .addCase(CLEAR_FILTERS, (state) => {
        state.filter = null
        state.subset = state.data?.time_entries
        state.isFiltered = false
      })
  )

export * from './useReportsReducer'
