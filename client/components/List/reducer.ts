import { createAction, createReducer, current } from '@reduxjs/toolkit'
import { IFilter } from 'components/FilterPanel'
import get from 'get-value'
import { useMemo, useReducer } from 'react'
import _ from 'underscore'
import { searchObject } from 'utils'
import {
  ColumnHeaderContextMenu,
  IListColumn,
  IListProps,
  IListState
} from './types'

export const PROPS_UPDATED = createAction<IListProps>('PROPS_UPDATED')
export const EXECUTE_SEARCH =
  createAction<{ searchTerm: string }>('EXECUTE_SEARCH')
export const INIT_COLUMN_HEADER_CONTEXT_MENU =
  createAction<ColumnHeaderContextMenu>('INIT_COLUMN_HEADER_CONTEXT_MENU')
export const DISMISS_COLUMN_HEADER_CONTEXT_MENU = createAction(
  'DISMISS_COLUMN_HEADER_CONTEXT_MENU'
)
export const SET_GROUP_BY =
  createAction<{ column: IListColumn }>('SET_GROUP_BY')
export const SET_FILTER_BY =
  createAction<{ column: IListColumn }>('SET_FILTER_BY')
export const TOGGLE_FILTER_PANEL = createAction('TOGGLE_FILTER_PANEL')
export const FILTERS_UPDATED =
  createAction<{ filters: IFilter[] }>('FILTERS_UPDATED')
export const CLEAR_FILTERS = createAction('CLEAR_FILTERS')

/**
 * Reducer for Timesheet
 *
 * @param initialState - Initial state
 */
export default (initialState: IListState) => {
  const reducer = useMemo(() => {
    return createReducer(initialState, (builder) =>
      builder
        .addCase(PROPS_UPDATED, (state, { payload }) => {
          state.origItems = payload.items ?? []
          state.items = state.origItems
            .filter((item) =>
              searchObject({
                item,
                searchTerm: state.searchTerm
              })
            )
            .filter((item) => {
              return (
                _.filter(Object.keys(payload.filterValues), (key) => {
                  return payload.filterValues[key].includes(get(item, key, ''))
                }).length === Object.keys(payload.filterValues).length
              )
            })
        })
        .addCase(EXECUTE_SEARCH, (state, { payload }) => {
          state.items = current(state).origItems.filter((item) =>
            searchObject({
              item,
              searchTerm: payload.searchTerm
            })
          )
          state.searchTerm = payload.searchTerm
        })
        .addCase(INIT_COLUMN_HEADER_CONTEXT_MENU, (state, { payload }) => {
          state.columnHeaderContextMenu = payload as any
        })
        .addCase(DISMISS_COLUMN_HEADER_CONTEXT_MENU, (state) => {
          state.columnHeaderContextMenu = null
        })
        .addCase(SET_GROUP_BY, (state, { payload }) => {
          state.groupBy =
            payload.column?.fieldName === state.groupBy?.fieldName
              ? null
              : payload.column
        })
        .addCase(SET_FILTER_BY, (state, { payload }) => {
          state.filterBy = payload.column
          state.isFilterPanelOpen = true
        })
        .addCase(TOGGLE_FILTER_PANEL, (state) => {
          state.isFilterPanelOpen = !state.isFilterPanelOpen
          if (!state.isFilterPanelOpen) {
            state.filterBy = null
          }
        })
        .addCase(FILTERS_UPDATED, (state, { payload }) => {
          state.filters = payload.filters
          state.items = _.filter(state.origItems, (entry) => {
            return (
              _.filter(payload.filters, (f) => {
                const selectedKeys = f.selected.map((s) => s.key)
                return selectedKeys.includes(get(entry, f.key, { default: '' }))
              }).length === payload.filters.length
            )
          })
        })
        .addCase(CLEAR_FILTERS, (state) => {
          state.items = state.origItems
        })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return useReducer(reducer, initialState)
}
