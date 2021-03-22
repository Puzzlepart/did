/* eslint-disable react-hooks/exhaustive-deps */
import { createAction, createReducer, current } from '@reduxjs/toolkit'
import { useMemo, useReducer } from 'react'
import { searchObject } from 'utils'
import { IListProps, IListState } from './types'

export const PROPS_UPDATED = createAction<IListProps>('PROPS_UPDATED')
export const EXECUTE_SEARCH = createAction<{ searchTerm: string }>(
  'EXECUTE_SEARCH'
)

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
    )
  }, [])
  return useReducer(reducer, initialState)
}
