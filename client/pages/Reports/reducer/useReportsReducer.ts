import { current } from '@reduxjs/toolkit'
import { useAppContext } from 'AppContext'
import { useReduxReducer as useReducer } from 'hooks'
import { useMemo } from 'react'
import _ from 'underscore'
import { IReportsState } from '../types'
import {
  ADD_SAVED_FILTER,
  DATA_UPDATED,
  REMOVE_SAVED_FILTER,
  SET_FILTER,
  SET_FILTER_STATE
} from './actions'

/**
 * Use Reports reducer
 *
 * @category Reports Hooks
 */
export function useReportsReducer() {
  const { getUserConfiguration } = useAppContext()
  const initialState = useMemo<IReportsState>(
    () =>
      ({
        loading: false,
        data: {
          reportLinks: [],
          users: [],
          periods: []
        },
        activeFilter: null,
        filterState: {
          filters: []
        },
        savedFilters: getUserConfiguration('reports.filters') || {}
      }) as IReportsState,
    []
  )
  return useReducer(initialState, (builder) =>
    builder
      /**
       * `DATA_UPDATED`: Update state with new data from the queries.
       */
      .addCase(DATA_UPDATED, (state, { payload }) => {
        state.loading = payload.loading
        if (payload) {
          state.data = { ...state.data, ...payload }
          const { timeEntries, users } = state.data
          if (timeEntries) {
            state.data.timeEntries = timeEntries.map((entry) => ({
              ...entry,
              resource: _.find(users, (u) => u.id === entry.resource.id)
            }))
          }
        }
      })

      .addCase(SET_FILTER, (state, { payload }) => {
        state.activeFilter =
          state.activeFilter?.key === payload.key ? null : (payload as any)
      })

      /**
       * `ADD_SAVED_FILTER`: Add new saved filter to the list of saved filters.
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
       * `REMOVE_SAVED_FILTER`: Remove saved filter from the list of saved filters.
       */
      .addCase(REMOVE_SAVED_FILTER, (state, { payload }) => {
        state.savedFilters = _.omit(state.savedFilters, payload)
        state.activeFilter = null
      })

      /**
       * `SET_FILTER_STATE`: Set filter state and update active filter if filter is not active.
       */
      .addCase(SET_FILTER_STATE, (state, { payload }) => {
        state.filterState = payload
        if (!payload.isFiltered) state.activeFilter = null
      })
  )
}
