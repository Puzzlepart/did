import { current } from '@reduxjs/toolkit'
import { useAppContext } from 'AppContext'
import { useReduxReducer as useReducer } from 'hooks'
import { useMemo } from 'react'
import _ from 'underscore'
import { IReportsData, IReportsState } from '../types'
import {
  ADD_SAVED_FILTER,
  APPLY_FILTER_STATE,
  DATA_UPDATED,
  PRELOAD_UPDATED,
  REMOVE_SAVED_FILTER,
  REPORT_CLEARED,
  REPORT_LOADED,
  SET_FILTERS_OPEN,
  SET_FILTER,
  SET_FILTER_STATE
} from './actions'
import { mapTimeEntries } from './utils'

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
          periods: [],
          timeEntries: []
        },
        activeFilter: null,
        filterState: {
          filters: []
        },
        appliedFilterState: {
          filters: []
        },
        isFiltersOpen: false,
        preload: {
          loading: false,
          approxCount: undefined
        },
        isReportLoaded: false,
        savedFilters: getUserConfiguration('reports.filters') || {}
      }) as IReportsState,
    []
  )
  return useReducer(initialState, (builder) =>
    builder
      /**
       * `DATA_UPDATED`: Update state with new data from the queries.
       */
      .addCase(DATA_UPDATED, (state, { payload }: { payload: Partial<IReportsData> }) => {
        if (payload.loading !== undefined) {
          state.loading = payload.loading
        }
        if (payload) {
          state.data = mapTimeEntries({ ...state.data, ...payload })
        }
      })

      /**
       * `PRELOAD_UPDATED`: Update preload state for the current report.
       */
      .addCase(PRELOAD_UPDATED, (state, { payload }) => {
        state.preload = payload
      })

      /**
       * `REPORT_CLEARED`: Clear loaded report time entries (used when changing preset).
       */
      .addCase(REPORT_CLEARED, (state) => {
        state.data = {
          ...state.data,
          timeEntries: []
        }
        state.isReportLoaded = false
      })

      /**
       * `REPORT_LOADED`: Mark the report as loaded.
       */
      .addCase(REPORT_LOADED, (state) => {
        state.isReportLoaded = true
      })

      /**
       * `SET_FILTERS_OPEN`: Track whether the filter panel is open.
       */
      .addCase(SET_FILTERS_OPEN, (state, { payload }) => {
        state.isFiltersOpen = payload
      })

      /**
       * `APPLY_FILTER_STATE`: Apply pending filters to server-side queries.
       */
      .addCase(APPLY_FILTER_STATE, (state, { payload }) => {
        const normalizedFilters = payload?.filters?.length
          ? [payload.filters[0]]
          : []
        state.appliedFilterState = {
          ...payload,
          filters: normalizedFilters
        }
      })

      /**
       * `SET_FILTER`: Set active filter.
       */
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
              [f.key]: Array.from(f.selected.values())
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
        const normalizedFilters = payload?.filters?.length
          ? [payload.filters[0]]
          : []
        state.filterState = {
          ...payload,
          filters: normalizedFilters
        }
        if (!payload.filters?.length) state.activeFilter = null
      })
  )
}
