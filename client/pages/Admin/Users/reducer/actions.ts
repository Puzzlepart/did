import { QueryResult } from '@apollo/client'
import { createAction } from '@reduxjs/toolkit'
import { User } from 'types'
import { IBulkImportPanelProps } from '../BulkImportPanel'
import { IUserFormProps } from '../UserForm'
import { IInviteExternalUserFormProps } from '../InviteExternalUserForm'

export const DATA_UPDATED = createAction<{ query: QueryResult<any> }>(
  'DATA_UPDATED'
)
export const SET_PROGRESS = createAction<string>('SET_PROGRESS')
export const SET_USER_FORM = createAction<IUserFormProps>('SET_USER_FORM')
export const SET_INVITE_EXTERNAL_USER_FORM =
  createAction<IInviteExternalUserFormProps>('SET_INVITE_EXTERNAL_USER_FORM')
export const HIDE_INVITE_EXTERNAL_USER_FORM = createAction(
  'HIDE_INVITE_EXTERNAL_USER_FORM'
)
export const SET_ADD_MULTIPLE_PANEL = createAction<IBulkImportPanelProps>(
  'SET_ADD_MULTIPLE_PANEL'
)
export const SET_SELECTED_USERS = createAction<User[]>('SET_SELECTED_USERS')
export const CLEAR_PROGRESS = createAction('CLEAR_PROGRESS')
export const HIDE_ADD_MULTIPLE_PANEL = createAction('HIDE_ADD_MULTIPLE_PANEL')
export const HIDE_USER_FORM = createAction('HIDE_USER_FORM')
export const RESET_SELECTION = createAction('RESET_SELECTION')
