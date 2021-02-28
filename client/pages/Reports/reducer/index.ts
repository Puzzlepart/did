import { createReducer, current } from '@reduxjs/toolkit'
import get from 'get-value'
import { getValue } from 'helpers'
import { filter, find, omit } from 'underscore'
import { IReportsState } from '../types'
import {
  INIT,
  ADD_FILTER,
  CHANGE_QUERY,
  CLEAR_FILTERS,
  DATA_UPDATED,
  FILTERS_UPDATED,
  REMOVE_SELECTED_FILTER,
  SET_FILTER,
  SET_GROUP_BY,
  TOGGLE_FILTER_PANEL
} from './actions'
import { IReportsReducerParams as IReportsReducerParameters } from './types'

/**
 * Creating reducer for Reports using reduxjs/toolkit
 */
export default ({ app, url, queries }: IReportsReducerParameters) =>
  createReducer<IReportsState>(
    {},
    {
      [INIT.type]: (state) => {
        state.query = find(queries, (q) => q.key === url.query) as any
        state.savedFilters = get(app.user.configuration, 'reports.filters', {
          default: {}
        })
      },

      [SET_FILTER.type]: (
        state,
        { payload }: ReturnType<typeof SET_FILTER>
      ) => {
        state.filter = payload.filter as any
        state.subset = filter(state.timeentries, (entry) => {
          return (
            filter(Object.keys(payload.filter.values), (key) => {
              return (
                payload.filter.values[key].includes(getValue(entry, key, ''))
              )
            }).length === Object.keys(payload.filter.values).length
          )
        })
        state.isFiltered = state.subset.length !== state.timeentries.length
      },

      [ADD_FILTER.type]: (
        state,
        { payload }: ReturnType<typeof ADD_FILTER>
      ) => {
        const newFilter: any = {
          ...current(state).filter,
          ...payload.model
        }
        state.savedFilters = {
          ...state.savedFilters,
          [newFilter.key]: newFilter
        }
        state.filter = newFilter
      },

      [REMOVE_SELECTED_FILTER.type]: (state) => {
        state.savedFilters = omit(state.savedFilters, state.filter.key)
        state.filter = null
        state.subset = state.timeentries
        state.isFiltered = false
      },

      [TOGGLE_FILTER_PANEL.type]: (state) => {
        state.isFiltersOpen = !state.isFiltersOpen
      },

      [DATA_UPDATED.type]: (
        state,
        { payload }: ReturnType<typeof DATA_UPDATED>
      ) => {
        state.loading = payload.query.loading
        state.timeentries = payload.query?.data?.timeentries || []
        state.subset = state.timeentries
      },

      [FILTERS_UPDATED.type]: (
        state,
        { payload }: ReturnType<typeof FILTERS_UPDATED>
      ) => {
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
        state.subset = filter(state.timeentries, (entry) => {
          return (
            filter(payload.filters, (f) => {
              const selectedKeys = f.selected.map((s) => s.key)
              return selectedKeys.includes(getValue(entry, f.key, ''))
            }).length === payload.filters.length
          )
        })
        state.isFiltered = state.subset.length !== state.timeentries.length
      },

      [SET_GROUP_BY.type]: (
        state,
        { payload }: ReturnType<typeof SET_GROUP_BY>
      ) => {
        state.groupBy = payload.groupBy
      },

      [CHANGE_QUERY.type]: (
        state,
        { payload }: ReturnType<typeof CHANGE_QUERY>
      ) => {
        state.query = find(queries, (q) => q.key === payload.key) as any
        state.subset = null
      },

      [CLEAR_FILTERS.type]: (state) => {
        state.filter = null
        state.subset = state.timeentries
        state.isFiltered = false
      }
    }
  )
