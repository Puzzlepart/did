import { IContextualMenuItem } from '@fluentui/react'
import { createAction } from '@reduxjs/toolkit'
import { ListFilterState } from 'components/List/types'
import { IReportsData, IReportsSavedFilter } from '../types'

/**
 * category Reports Actions
 */
export const DATA_UPDATED = createAction<IReportsData>('DATA_UPDATED')

/**
 * @category Reports Actions
 */
export const SET_FILTER = createAction<IReportsSavedFilter>('SET_FILTER')

/**
 * @category Reports Actions
 */
export const ADD_SAVED_FILTER = createAction<{ model: IContextualMenuItem }>(
  'ADD_SAVED_FILTER'
)

/**
 * @category Reports Actions
 */
export const REMOVE_SAVED_FILTER = createAction<string>('REMOVE_SAVED_FILTER')

/**
 * @category Reports Actions
 */
export const SET_FILTER_STATE =
  createAction<ListFilterState>('SET_FILTER_STATE')
