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
   * Queries for the reports
   */
  queries: IReportsQuery[]
}

/**
 * @category Reports
 */
export const ReportsContext = createContext<IReportsContext>(null)

/**
 * Returns the current value of the ReportsContext.
 *
 * @returns The current value of the ReportsContext.
 */
export const useReportsContext = () => useContext(ReportsContext)
