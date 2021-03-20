/* eslint-disable react-hooks/exhaustive-deps */
import { createAction, createReducer } from '@reduxjs/toolkit'
import { IPivotItemProps } from 'office-ui-fabric-react'
import { useMemo, useReducer } from 'react'
import { IAppState } from './types'

export const UPDATE_NAV = createAction<{ nav: IPivotItemProps }>('UPDATE_NAV')

/**
 * Use app reducer
 *
 * @remarks Using `createReducer` from `@reduxjs/toolkit` and
 * `useReducer` from `react`
 *
 * @param initialState - Initial state
 */
export default function useAppReducer(initialState: IAppState) {
  const reducer = useMemo(
    () =>
      createReducer(initialState, (builder) =>
        builder.addCase(UPDATE_NAV, (state, { payload }) => {
          state.nav = payload.nav as any
        })
      ),
    []
  )
  return useReducer(reducer, initialState)
}
