import { createReducer, current } from '@reduxjs/toolkit'
import _, { find } from 'underscore'
import { IReportsState } from '../types'
import {
  ADD_SAVED_FILTER,
  CHANGE_QUERY,
  DATA_UPDATED,
  REMOVE_SAVED_FILTER,
  SET_FILTER,
  SET_FILTER_STATE
} from './actions'

/**
 * Creating reducer for `Reports` using [reduxjs/toolkit]
 */
export default ({ initialState, queries }) =>
  createReducer<IReportsState>(initialState, (builder) =>
    builder
      .addCase(DATA_UPDATED, (state, { payload }) => {
        state.loading = payload.result.loading
        if (payload.result?.data) {
          state.data = { ...state.data, ...payload.result.data }
          const { timeEntries, users } = state.data
          if (timeEntries) {
            state.data.timeEntries = timeEntries.map((entry) => ({
              ...entry,
              resource: find(users, (u) => u.id === entry.resource.id)
            }))
          }
        }
      })
      .addCase(SET_FILTER, (state, { payload }) => {
        state.activeFilter =
          state.activeFilter?.key !== payload.key ? (payload as any) : null
      })
      .addCase(ADD_SAVED_FILTER, (state, { payload }) => {
        const newFilter: any = {
          values: current(state).filterState?.filters?.reduce(
            (object, f) => ({
              ...object,
              [f.key]: f.selected.map((index) => index.key)
            }),
            {}
          ),
          ...payload.model
        }
        state.savedFilters = {
          ...state.savedFilters,
          [newFilter.key]: newFilter
        }
        state.activeFilter = newFilter
      })
      .addCase(REMOVE_SAVED_FILTER, (state, { payload }) => {
        state.savedFilters = _.omit(state.savedFilters, payload)
        state.activeFilter = null
      })
      .addCase(CHANGE_QUERY, (state, { payload }) => {
        state.preset = _.find(
          queries,
          (q) => q.itemKey === payload?.itemKey
        ) as any
      })
      .addCase(SET_FILTER_STATE, (state, { payload }) => {
        state.filterState = payload
        if (!payload.isFiltered) state.activeFilter = null
      })
  )

export * from './useReportsReducer'
