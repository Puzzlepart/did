import { AnyAction } from '@reduxjs/toolkit'
import { TFunction } from 'i18next'
import { createContext } from 'react'
import { IReportsState } from './types'

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
   * Translate function
   */
  t: TFunction
}

export const ReportsContext = createContext<IReportsContext>(null)
