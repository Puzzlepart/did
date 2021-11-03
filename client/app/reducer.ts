/* eslint-disable tsdoc/syntax */
/* eslint-disable react-hooks/exhaustive-deps */
import { createAction, createReducer } from '@reduxjs/toolkit'
import { useMemo, useReducer } from 'react'
import _ from 'underscore'
import { IMobileBreadcrumbItem } from '../parts/MobileBreadcrumb'
import { IAppState } from './types'

export const UPDATE_BREADCRUMB =
  createAction<IMobileBreadcrumbItem>('UPDATE_BREADCRUMB')
export const PAGE_NAVIGATE = createAction('PAGE_NAVIGATE')

/**
 * Use app reducer
 *
 * @remarks Using `createReducer` from `@reduxjs/toolkit` and
 * `useReducer` from `react`
 *
 * @param initialState - Initial state
 *
 * @category App
 */
export default function useAppReducer(initialState: IAppState) {
  const reducer = useMemo(
    () =>
      createReducer(initialState, (builder) =>
        builder
          .addCase(UPDATE_BREADCRUMB, (state, { payload: item }) => {
            const nav = {
              ...state.nav,
              [item.level]: item
            }
            const keys = Object.keys(nav).filter(
              (l) => Number.parseInt(l) <= item.level
            )
            state.nav = _.pick(nav, keys)
          })
          .addCase(PAGE_NAVIGATE, (state) => {
            state.nav = null
          })
      ),
    []
  )
  return useReducer(reducer, initialState)
}
