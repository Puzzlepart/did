import { QueryResult } from '@apollo/client'
import { createAction } from '@reduxjs/toolkit'
import { IAddMultiplePanelProps } from '../AddMultiplePanel'
import { IUserFormProps } from '../UserForm'
import { User } from 'types'

export const DATA_UPDATED =
  createAction<{ query: QueryResult<any> }>('DATA_UPDATED')
export const SET_PROGRESS = createAction<string>('SET_PROGRESS')
export const SET_USER_FORM = createAction<IUserFormProps>('SET_USER_FORM')
export const SET_ADD_MULTIPLE_PANEL = createAction<IAddMultiplePanelProps>(
  'SET_ADD_MULTIPLE_PANEL'
)
export const SET_SELECTED_USERS = createAction<User[]>(
  'SET_SELECTED_USERS'
)
export const CLEAR_PROGRESS = createAction('CLEAR_PROGRESS')
export const HIDE_ADD_MULTIPLE_PANEL = createAction('HIDE_ADD_MULTIPLE_PANEL')
export const HIDE_USER_FORM = createAction('HIDE_USER_FORM')
