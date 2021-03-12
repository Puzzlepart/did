/* eslint-disable react-hooks/exhaustive-deps */
import { QueryResult } from '@apollo/client'
import { createAction, createReducer } from '@reduxjs/toolkit'
import { useMemo, useReducer } from 'react'
import { ISummaryViewState } from './types'

export const DATA_UPDATED = createAction<{ data: QueryResult<any> }>(
  'DATA_UPDATED'
)

function createReducer_(initialState: ISummaryViewState) {
  return createReducer(initialState, {
    [DATA_UPDATED.type]: (
      state,
      { payload }: ReturnType<typeof DATA_UPDATED>
    ) => {
      if (payload.data) {
        state.periods = payload.data['periods']
        state.users = payload.data['users']
        state.projects = payload.data['projects']
      }
    }
  })
}

/**
 * Reducer hook for SummaryView
 *
 * @returns React.useReducer with parameters
 */
export function useSummaryViewReducer() {
  const initialState = {
    users: [],
    periods: [],
    projects: [],
  }
  const reducer = useMemo(() => createReducer_(initialState), [initialState])
  return useReducer(reducer, initialState)
}
