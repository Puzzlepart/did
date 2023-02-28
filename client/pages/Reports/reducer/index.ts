import { createReducer, current } from '@reduxjs/toolkit'
import _, { find } from 'underscore'
import { IReportsQuery, IReportsState } from '../types'
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
      /**
       * Update state with new data from the queries.
       */
      .addCase(DATA_UPDATED, (state, { payload }) => {
        state.loading = payload.queryResult.loading
        if (payload.queryResult?.data) {
          state.data = { ...state.data, ...payload.queryResult.data }
          const { timeEntries, users } = state.data
          if (timeEntries) {
            state.data.timeEntries = timeEntries.map((entry) => ({
              ...entry,
              resource: find(users, (u) => u.id === entry.resource.id)
            }))
          }
        }
        if (payload.reportLinksQuery?.data) {
          state.reportLinks = payload.reportLinksQuery.data.reportLinks ?? []
        }
      })
      .addCase(SET_FILTER, (state, { payload }) => {
        state.activeFilter =
          state.activeFilter?.key === payload.key ? null : (payload as any)
      })

      /**
       * Add new saved filter to the list of saved filters.
       */
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

      /**
       * Remove saved filter from the list of saved filters.
       */
      .addCase(REMOVE_SAVED_FILTER, (state, { payload }) => {
        state.savedFilters = _.omit(state.savedFilters, payload)
        state.activeFilter = null
      })

      /**
       * Change query preset and update report links based on the new preset.
       */
      .addCase(CHANGE_QUERY, (state, { payload }) => {
        const queryPreset = _.find<IReportsQuery>(
          queries,
          (q) => q.itemKey === payload?.itemKey
        )
        if (payload.force) {
          state.queryPreset = queryPreset
          return
        }
        const reportLinks = _.filter(
          current(state).reportLinks,
          ({ linkRef }) => linkRef === queryPreset.reportLinkRef
        )
        state.queryPreset = { ...queryPreset, reportLinks }
      })

      /**
       * Set filter state and update active filter if filter is not active.
       */
      .addCase(SET_FILTER_STATE, (state, { payload }) => {
        state.filterState = payload
        if (!payload.isFiltered) state.activeFilter = null
      })
  )

export * from './useReportsReducer'
