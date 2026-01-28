import { createAction } from '@reduxjs/toolkit'
import { ListFilterState } from 'components/List/types'
import { IReportsData, IReportsMenuItem, IReportsSavedFilter } from '../types'

/**
 * category Reports Actions
 */
export const DATA_UPDATED = createAction<Partial<IReportsData>>('DATA_UPDATED')

/**
 * @category Reports Actions
 */
export const SET_FILTER = createAction<IReportsSavedFilter>('SET_FILTER')

/**
 * @category Reports Actions
 */
export const ADD_SAVED_FILTER = createAction<{ model: IReportsMenuItem }>(
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

/**
 * @category Reports Actions
 */
export const PRELOAD_UPDATED = createAction<{
  loading: boolean
  approxCount?: number
  filterOptions?: {
    projectNames: string[]
    parentProjectNames: string[]
    customerNames: string[]
    partnerNames: string[]
    employeeNames: string[]
  }
}>('PRELOAD_UPDATED')

/**
 * @category Reports Actions
 */
export const REPORT_CLEARED = createAction('REPORT_CLEARED')

/**
 * @category Reports Actions
 */
export const REPORT_LOADED = createAction('REPORT_LOADED')

/**
 * @category Reports Actions
 */
export const SET_FILTERS_OPEN = createAction<boolean>('SET_FILTERS_OPEN')

/**
 * @category Reports Actions
 */
export const APPLY_FILTER_STATE =
  createAction<ListFilterState>('APPLY_FILTER_STATE')
