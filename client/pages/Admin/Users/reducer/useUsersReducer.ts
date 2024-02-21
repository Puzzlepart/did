import get from 'get-value'
import { useReduxReducer as useReducer } from 'hooks'
import _ from 'underscore'
import {
  CLEAR_PROGRESS,
  DATA_UPDATED,
  HIDE_ADD_MULTIPLE_PANEL,
  HIDE_USER_FORM,
  SET_ADD_MULTIPLE_PANEL,
  SET_PROGRESS,
  SET_SELECTED_USERS,
  SET_USER_FORM
} from './actions'
import { initialState } from './initialState'

/**
 * Use Users reducer
 */
export function useUsersReducer() {
  return useReducer(initialState, (builder) =>
    builder
      .addCase(DATA_UPDATED, (state, { payload }) => {
        const users = get(payload, 'query.data.users', { default: [] })
        const activeDirectoryUsers = get(
          payload,
          'query.data.activeDirectoryUsers',
          { default: [] }
        )
        const roles = get(payload, 'query.data.roles', { default: [] })
        state.users = users
        state.activeUsers = _.filter(users, (u) => u.accountEnabled !== false)
        state.disabledUsers = _.filter(users, (u) => u.accountEnabled === false)
        state.roles = roles
        state.adUsers = activeDirectoryUsers
        state.availableAdUsers = _.filter(
          activeDirectoryUsers,
          (x) => !_.any(users, (y) => y.id === x.id)
        )
        state.loading = payload.query.loading
      })
      .addCase(SET_USER_FORM, (state, { payload }) => {
        state.userForm = payload
      })
      .addCase(SET_ADD_MULTIPLE_PANEL, (state, { payload }) => {
        state.bulkImportPanel = payload
      })
      .addCase(SET_SELECTED_USERS, (state, { payload }) => {
        state.selectedUsers = payload
      })
      .addCase(SET_PROGRESS, (state, { payload }) => {
        state.progress = payload
      })
      .addCase(CLEAR_PROGRESS, (state) => {
        state.progress = null
      })
      .addCase(HIDE_ADD_MULTIPLE_PANEL, (state) => {
        state.bulkImportPanel = null
      })
      .addCase(HIDE_USER_FORM, (state) => {
        state.userForm = null
      })
  )
}
