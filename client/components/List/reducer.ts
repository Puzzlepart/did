/* eslint-disable react-hooks/exhaustive-deps */
import { ContextualMenuItemType } from '@fluentui/react'
import { createAction, createReducer, current } from '@reduxjs/toolkit'
import { useMemo, useReducer } from 'react'
import _ from 'underscore'
import { searchObject } from 'utils'
import { IListColumn, IListColumnData, IListProps, IListState } from './types'

export const PROPS_UPDATED = createAction<IListProps>('PROPS_UPDATED')
export const EXECUTE_SEARCH =
  createAction<{ searchTerm: string }>('EXECUTE_SEARCH')
export const INIT_COLUMN_HEADER_CONTEXT_MENU = createAction<{
  column: IListColumn
  targetElement: EventTarget & HTMLElement
}>('INIT_COLUMN_HEADER_CONTEXT_MENU')
export const DISMISS_COLUMN_HEADER_CONTEXT_MENU = createAction('DISMISS_COLUMN_HEADER_CONTEXT_MENU')

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
          state.origItems = payload.items || []
          state.items = state.origItems.filter((item) =>
            searchObject({
              item,
              searchTerm: state.searchTerm
            })
          )
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
          const columnData: IListColumnData = payload.column.data ?? {}
          const columnHeaderContextMenu = {
            target: payload.targetElement as any,
            items: [
              columnData.isSortable && {
                key: 'sortDesc',
                text: 'A til Å'
              },
              columnData.isSortable && {
                key: 'sortAsc',
                text: 'Å til A'
              },
              columnData.isFilterable && {
                key: 'separator',
                itemType: ContextualMenuItemType.Divider
              },
              columnData.isFilterable && {
                key: 'filterBy',
                text: 'Filtrer etter'
              },
              columnData.isGroupable && {
                key: 'separator',
                itemType: ContextualMenuItemType.Divider
              },
              columnData.isGroupable && {
                key: 'groupBy',
                text: `Grupper etter ${payload.column.name}`
              }
            ].filter(Boolean)
          }
          if (!_.isEmpty(columnHeaderContextMenu.items)) state.columnHeaderContextMenu = columnHeaderContextMenu
        })
        .addCase(DISMISS_COLUMN_HEADER_CONTEXT_MENU, (state) => {
state.columnHeaderContextMenu = null
        })
    )
  }, [])
  return useReducer(reducer, initialState)
}
