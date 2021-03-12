/* eslint-disable react-hooks/exhaustive-deps */
import { QueryResult } from '@apollo/client'
import { createAction, createReducer } from '@reduxjs/toolkit'
import { useMemo, useReducer } from 'react'
import { first } from 'underscore'
import { ISummaryViewScope, ISummaryViewState } from './types'

export const DATA_UPDATED = createAction<{ data: QueryResult<any> }>(
  'DATA_UPDATED'
)
export const CHANGE_SCOPE = createAction<{ scope: ISummaryViewScope }>(
  'CHANGE_SCOPE'
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
    },
    [CHANGE_SCOPE.type]: (
      state,
      { payload }: ReturnType<typeof CHANGE_SCOPE>
    ) => {
      state.scope = payload.scope as any
    }
  })
}

/**
 * Reducer hook for SummaryView
 *
 * @param scopes -  Scopes
 * @returns React.useReducer with parameters
 */
export function useSummaryViewReducer(scopes: ISummaryViewScope[]) {
  const initialState = {
    users: [],
    periods: [],
    projects: [],
    scope: first(scopes)
  }
  const reducer = useMemo(() => createReducer_(initialState), [initialState])
  return useReducer(reducer, initialState)
}
