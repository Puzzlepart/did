import { createReducer } from '@reduxjs/toolkit'
import _ from 'underscore'
import { IUsersState } from '../types'
import { CLEAR_PROGRESS, DATA_UPDATED, HIDE_ADD_MULTIPLE_PANEL, HIDE_USER_FORM, SET_ADD_MULTIPLE_PANEL, SET_PROGRESS, SET_USER_FORM } from './actions'

export const initialState: IUsersState = {
  loading: true,
  activeUsers: [],
  disabledUsers: [],
  availableAdUsers: [],
  roles: []
}

/**
 * Create reducer for `<Users />` using `@reduxjs/toolkit`.
 */
export default () =>
  createReducer(initialState, (builder) =>
    builder
      .addCase(DATA_UPDATED, (state, { payload }) => {
        const { data } = payload.query ?? {}
        // eslint-disable-next-line no-console
        console.log(data)
        state.activeUsers = data?.users ?? []
        state.roles = data?.roles ?? []
        state.availableAdUsers = _.filter(
          data?.activeDirectoryUsers ?? [],
          (x) => !_.any(data?.users ?? [], (y) => y.id === x.id)
        )
        state.loading = payload.query.loading
      })
      .addCase(SET_PROGRESS, (state, { payload }) => {
        state.progress = payload
      })
      .addCase(SET_USER_FORM, (state, { payload }) => {
        state.userForm = payload
      })
      .addCase(SET_ADD_MULTIPLE_PANEL, (state, { payload }) => {
        state.addMultiplePanel = payload
      })
      .addCase(CLEAR_PROGRESS, (state) => {
        state.progress = null
      })
      .addCase(HIDE_ADD_MULTIPLE_PANEL, (state) => {
        state.addMultiplePanel = null
      })
      .addCase(HIDE_USER_FORM, (state) => {
        state.userForm = null
      })
  )

export * from './useUsersReducer'
