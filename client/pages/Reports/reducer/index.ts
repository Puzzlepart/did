import { createReducer, current } from '@reduxjs/toolkit'
import _, { find } from 'underscore'
import { IReportsState } from '../types'
import {
  ADD_SAVED_FILTER,
  CHANGE_QUERY,
  DATA_UPDATED,
  REMOVE_SELECTED_SAVED_FILTER,
  SET_FILTER
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
        state.filter = payload.filter as any
      })
      .addCase(ADD_SAVED_FILTER, (state, { payload }) => {
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
      .addCase(REMOVE_SELECTED_SAVED_FILTER, (state) => {
        state.savedFilters = _.omit(state.savedFilters, state.filter.key)
        state.filter = null
      })
      .addCase(CHANGE_QUERY, (state, { payload }) => {
        state.preset = _.find(
          queries,
          (q) => q.itemKey === payload?.itemKey
        ) as any
      })
  )

export * from './useReportsReducer'
