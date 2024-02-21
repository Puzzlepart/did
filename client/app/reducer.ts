import { createAction } from '@reduxjs/toolkit'
import { IToastProps } from 'components'
import { useReduxReducer as useReducer } from 'hooks/useReduxReducer'
import _ from 'underscore'
import { IMobileBreadcrumbItem } from '../parts/MobileBreadcrumb'
import { IAppState } from './types'

export const UPDATE_BREADCRUMB = createAction<{
  item: IMobileBreadcrumbItem
  clear?: boolean
}>('UPDATE_BREADCRUMB')
export const RESET_BREADCRUMB = createAction('RESET_BREADCRUMB')
export const PAGE_NAVIGATE = createAction('PAGE_NAVIGATE')
export const SET_TOAST = createAction<IToastProps>('SET_TOAST')

/**
 * Use app reducer
 *
 * @param initialState - Initial state
 *
 * @category App
 */
export default function useAppReducer(initialState: IAppState) {
  return useReducer(initialState, (builder) =>
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
      .addCase(SET_TOAST, (state, { payload }) => {
        state.toast = payload as any
      })
  )
}
