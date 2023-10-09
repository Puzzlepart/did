import { AnyAction } from '@reduxjs/toolkit'
import { IListColumn } from 'components/List/types'
import { createContext, Dispatch, useContext } from 'react'
import { IReportsQuery, IReportsState } from './types'

/**
 * @category Reports
 */
export interface IReportsContext {
  /**
   * State
   */
  state?: IReportsState

  /**
   * Dispatch an action
   */
  dispatch?: Dispatch<AnyAction>

  /**
   * Columns
   */
  columns?: IListColumn[]

  /**
   * The currently selected query preset
   */
  queryPreset: IReportsQuery
}

/**
 * @category Reports
 */
export const ReportsContext = createContext<IReportsContext>(null)

/**
 * Returns the current value of the `ReportsContext` or the `fallbackValue`
 * if the context is not available.
 *
 * @returns The current value of the `ReportsContext`, or the `fallbackValue`
 * if the context is not available.
 */
export const useReportsContext = (fallbackValue: IReportsContext = null) => {
  const context = useContext(ReportsContext)
  if (!context) {
    return fallbackValue
  }
  return context
}
