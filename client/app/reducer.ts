/* eslint-disable react-hooks/exhaustive-deps */
import { createAction, createReducer } from '@reduxjs/toolkit'
import { useMemo, useReducer } from 'react'
import { omit } from 'underscore'
import { IMobileBreadcrumbItem } from './MobileBreadcrumb'
import { IAppState } from './types'

/**
 * dsadasdasdasdasda
 */
export const UPDATE_BREADCRUMB = createAction<[IMobileBreadcrumbItem, any[]?]>(
  'UPDATE_BREADCRUMB'
)
export const PAGE_NAVIGATE = createAction('PAGE_NAVIGATE')

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
        builder
          .addCase(UPDATE_BREADCRUMB, (state, { payload }) => {
            const [item, omit_] = payload
            state.nav = omit(
              {
                ...state.nav,
                [item.level]: item
              },
              omit_
            )
          })
          .addCase(PAGE_NAVIGATE, (state) => {
            state.nav = null
          })
      ),
    []
  )
  return useReducer(reducer, initialState)
}
