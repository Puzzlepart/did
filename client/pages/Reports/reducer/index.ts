import { createReducer, current, Draft } from '@reduxjs/toolkit'
import get from 'get-value'
import _, { find } from 'underscore'
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
 * Case reducer for action `DATA_UPDATED`.

 * Joins the data retrieved with GraphQL. Handles inclusion of 
 * all resource data in the time entry objects.
 */
function dataUpdatedCaseReducer(
  state: Draft<IReportsState>,
  { payload }: ReturnType<typeof DATA_UPDATED>
) {
  state.loading = payload.result.loading
  if (payload.result?.data) {
    state.data = { ...state.data, ...payload.result.data }
    const { timeEntries, users } = state.data
    if (timeEntries) {
      state.data.timeEntries = timeEntries.map((entry) => ({
        ...entry,
        resource: find(users, (u) => u.id === entry.resource.id)
      }))
      state.subset = current(state).data.timeEntries
    }
  }
}

/**
 * Creating reducer for `Reports` using [reduxjs/toolkit]
 */
export default ({ initialState, queries }) =>
  createReducer<IReportsState>(initialState, (builder) =>
    builder
      .addCase(DATA_UPDATED, dataUpdatedCaseReducer)
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
