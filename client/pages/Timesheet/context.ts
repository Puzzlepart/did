/* eslint-disable tsdoc/syntax */
import { ApolloQueryResult } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { createContext, Dispatch, useContext } from 'react'
import { UseSubmitActionsHook } from './hooks/useSubmitActions'
import { ITimesheetState } from './types'

/**
 * @category Timesheet
 */
export interface ITimesheetContext extends UseSubmitActionsHook {
  /**
   * State
   */
  state: ITimesheetState

  /**
   * Dispatch an action
   */
  dispatch?: Dispatch<AnyAction>

  /**
   * Refetch data
   */
  refetch?: () => Promise<ApolloQueryResult<any>>
}

/**
 * @category Timesheet
 */
export const TimesheetContext = createContext<ITimesheetContext>(null)

/**
 * Returns the current context value for Timesheet using
 * `useContext` from `react`
 *
 * @returns `TimesheetContext`
 */
export const useTimesheetContext = () => useContext(TimesheetContext)
