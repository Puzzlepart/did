/* eslint-disable tsdoc/syntax */
import { AnyAction } from '@reduxjs/toolkit'
import { IListColumn } from 'components/List/types'
import { TFunction } from 'i18next'
import { createContext } from 'react'
import { IReportsState } from './types'

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
  dispatch?: React.Dispatch<AnyAction>

  /**
   * Columns
   */
  columns: IListColumn[]

  /**
   * Translate function
   */
  t: TFunction
}

/**
 * @category Reports
 */
export const ReportsContext = createContext<IReportsContext>(null)
