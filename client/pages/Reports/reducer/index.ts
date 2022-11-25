import { createReducer, current, Draft } from '@reduxjs/toolkit'
import get from 'get-value'
import _, { find } from 'underscore'
import { IReportsState } from '../types'
import {
  ADD_SAVED_FILTER,
  CHANGE_QUERY,
  DATA_UPDATED,
  REMOVE_SELECTED_SAVED_FILTER,
  SET_FILTER,
  SET_GROUP_BY
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
        state.subset = state.data?.timeEntries
        state.isFiltered = false
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
  )

export * from './useReportsReducer'
