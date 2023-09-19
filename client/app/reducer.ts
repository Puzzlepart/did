import { createAction } from '@reduxjs/toolkit'
import { useReduxReducer } from 'hooks/useReduxReducer'
import _ from 'underscore'
import { IMobileBreadcrumbItem } from '../parts/MobileBreadcrumb'
import { IAppState } from './types'

export const UPDATE_BREADCRUMB = createAction<{
  item: IMobileBreadcrumbItem
  clear?: boolean
}>('UPDATE_BREADCRUMB')
export const RESET_BREADCRUMB = createAction('RESET_BREADCRUMB')
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
  return useReduxReducer(initialState, (builder) =>
    builder
      .addCase(
        UPDATE_BREADCRUMB,
        (state, { payload: { item, clear = true } }) => {
          const nav = {
            ...state.nav,
            [item.level]: item
          }
          const keys = _.filter(Object.keys(nav), (l) =>
            clear ? Number.parseInt(l) <= item.level : true
          )
          state.nav = _.pick(nav, keys)
        }
      )
      .addCase(RESET_BREADCRUMB, (state) => {
        state.nav = {}
      })
      .addCase(PAGE_NAVIGATE, (state) => {
        state.nav = null
      })
  )
}
