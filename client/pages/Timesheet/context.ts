import { ApolloQueryResult } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { createContext, Dispatch, useContext } from 'react'
import { useSubmitActions } from './hooks/useSubmitActions'
import { ITimesheetState } from './types/ITimesheetState'

/**
 * @category Timesheet
 */
export interface ITimesheetContext {
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

  /**
   * Submit the current period.
   *
   * @param options - The options for submitting the period.
   */
  onSubmitPeriod: ReturnType<typeof useSubmitActions>['onSubmitPeriod']

  /**
   * Unsubmit the current period.
   *
   * @param options - The options for unsubmitting the period.
   */
  onUnsubmitPeriod: ReturnType<typeof useSubmitActions>['onUnsubmitPeriod']
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

/**
 * Returns the current state value for Timesheet using
 * `useContext` from `react`
 *
 * @category Timesheet
 *
 * @returns `ITimesheetState`
 */
export const useTimesheetState = () => useContext(TimesheetContext).state
