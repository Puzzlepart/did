import { createReducer, current } from '@reduxjs/toolkit'
import get from 'get-value'
import _ from 'underscore'
import { IReportsState } from '../types'
import {
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

/**
 * Creating reducer for `Reports` using [reduxjs/toolkit]
 */
export default ({ initialState, queries }) =>
  createReducer<IReportsState>(initialState, (builder) =>
    builder
      .addCase(DATA_UPDATED, (state, { payload }) => {
        state.loading = payload.query.loading
        if (payload.query?.data) {
          state.data = { ...state.data, ...payload.query.data }
          state.subset = current(state).data.timeEntries
        }
      })
      .addCase(SET_FILTER, (state, { payload }) => {
        state.filter = payload.filter as any
        state.subset = _.filter(state.data?.timeEntries, (entry) => {
          return (
            _.filter(Object.keys(payload.filter.values), (key) => {
              return payload.filter.values[key].includes(get(entry, key, ''))
            }).length === Object.keys(payload.filter.values).length
          )
        })
        state.isFiltered =
          state.subset.length !== state.data?.timeEntries?.length
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
        state.savedFilters = _.omit(state.savedFilters, state.filter.key)
        state.filter = null
        state.subset = state.data?.timeEntries
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
        state.subset = _.filter(state.data?.timeEntries, (entry) => {
          return (
            _.filter(payload.filters, (f) => {
              const selectedKeys = f.selected.map((s) => s.key)
              return selectedKeys.includes(get(entry, f.key, { default: '' }))
            }).length === payload.filters.length
          )
        })
        state.isFiltered =
          state.subset.length !== state.data?.timeEntries?.length
      })
      .addCase(SET_GROUP_BY, (state, { payload }) => {
        state.groupBy = payload.groupBy
      })
      .addCase(CHANGE_QUERY, (state, { payload }) => {
        state.preset = _.find(
          queries,
          (q) => q.itemKey === payload?.itemKey
        ) as any
        state.subset = []
      })
      .addCase(CLEAR_FILTERS, (state) => {
        state.filter = null
        state.subset = state.data?.timeEntries
        state.isFiltered = false
      })
  )

export * from './useReportsReducer'
