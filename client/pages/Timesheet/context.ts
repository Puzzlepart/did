import { ApolloQueryResult } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { TFunction } from 'i18next'
import { createContext, Dispatch } from 'react'
import { useSubmitActions } from './hooks/useSubmitActions'
import { ITimesheetState } from './types'

export interface ITimesheetContext
  extends ITimesheetState,
    ReturnType<typeof useSubmitActions> {
  /**
   * Dispatch an action
   */
  dispatch?: Dispatch<AnyAction>

  /**
   * Refetch data
   */
  refetch?: () => Promise<ApolloQueryResult<any>>

  /**
   * Translate function
   */
  t: TFunction
}

export const TimesheetContext = createContext<ITimesheetContext>(null)
