/* eslint-disable tsdoc/syntax */
import { LazyQueryResult } from '@apollo/client'
import { IContextualMenuItem } from '@fluentui/react'
import { createAction } from '@reduxjs/toolkit'
import { IFilter } from 'components/FilterPanel'
import { IListGroupProps } from 'components/List/types'
import { IReportsSavedFilter } from '../types'

/**
 * @category Reports Actions
 */
export const TOGGLE_FILTER_PANEL = createAction('TOGGLE_FILTER_PANEL')

/**
 * category Reports Actions
 */
export const DATA_UPDATED = createAction<{ result: LazyQueryResult<any, any> }>('DATA_UPDATED')

/**
 * @category Reports Actions
 */
export const FILTERS_UPDATED = createAction<{ filters: IFilter[] }>(
  'FILTERS_UPDATED'
)

/**
 * @category Reports Actions
 */
export const CHANGE_QUERY = createAction<{ itemKey: string }>('FILTER_UPDATED')

/**
 * @category Reports Actions
 */
export const SET_GROUP_BY = createAction<{ groupBy: IListGroupProps }>(
  'SET_GROUP_BY'
)

/**
 * @category Reports Actions
 */
export const SET_FILTER = createAction<{ filter: IReportsSavedFilter }>(
  'SET_FILTER'
)

/**
 * @category Reports Actions
 */
export const ADD_FILTER = createAction<{ model: IContextualMenuItem }>(
  'ADD_FILTER'
)

/**
 * @category Reports Actions
 */
export const CLEAR_FILTERS = createAction('CLEAR_FILTERS')

/**
 * @category Reports Actions
 */
export const REMOVE_SELECTED_FILTER = createAction('REMOVE_SELECTED_FILTER')
