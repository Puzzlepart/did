import { LazyQueryResult } from '@apollo/client'
import { IContextualMenuItem } from '@fluentui/react'
import { createAction } from '@reduxjs/toolkit'
import { IReportsSavedFilter } from '../types'

/**
 * category Reports Actions
 */
export const DATA_UPDATED =
  createAction<{ result: LazyQueryResult<any, any> }>('DATA_UPDATED')

/**
 * @category Reports Actions
 */
export const CHANGE_QUERY = createAction<{ itemKey: string }>('FILTER_UPDATED')

/**
 * @category Reports Actions
 */
export const SET_FILTER =
  createAction<{ filter: IReportsSavedFilter }>('SET_FILTER')

/**
 * @category Reports Actions
 */
export const ADD_SAVED_FILTER =
  createAction<{ model: IContextualMenuItem }>('ADD_SAVED_FILTER')

/**
 * @category Reports Actions
 */
export const REMOVE_SELECTED_SAVED_FILTER = createAction(
  'REMOVE_SELECTED_SAVED_FILTER'
)
