/* eslint-disable tsdoc/syntax */
import { AnyAction } from '@reduxjs/toolkit'
import { TFunction } from 'i18next'
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList'
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
  columns: IColumn[]

  /**
   * Translate function
   */
  t: TFunction
}

/**
 * @category Reports
 */
export const ReportsContext = createContext<IReportsContext>(null)
