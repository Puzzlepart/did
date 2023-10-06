import { ApolloQueryResult } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { createContext, Dispatch, useContext } from 'react'
import { useSubmitActions } from './hooks/useSubmitActions'
import { ITimesheetState } from './types/ITimesheetState'

/**
 * @category Timesheet
 */
export interface ITimesheetContext extends ReturnType<typeof useSubmitActions> {
  /**
   * State of the timesheet component
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
 * @category Timesheet
 *
 * @returns `TimesheetContext`
 */
export const useTimesheetContext = () => useContext(TimesheetContext)
