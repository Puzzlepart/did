import { ApolloQueryResult, OperationVariables } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { createContext, Dispatch, useContext } from 'react'
import { useSubmitActions } from './hooks/useSubmitActions'
import { useTimesheetEventIgnored } from './hooks/useTimesheetEventIgnored'
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
  refetch?: (
    variables?: Partial<OperationVariables>
  ) => Promise<ApolloQueryResult<any>>

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

  /**
   * Ignore an event (persists to server).
   */
  onIgnoreEvent?: ReturnType<typeof useTimesheetEventIgnored>['setIgnored']

  /**
   * Ignore all unmatched events for the current period (persists to server).
   * Derives periodId and eventIds from current state.
   */
  onIgnoreAll?: () => Promise<{ success: boolean; opId?: string; duplicate?: boolean }>

  /**
   * Clear all ignored events for the current period (persists to server).
   * Derives periodId from current state.
   */
  onClearIgnored?: () => Promise<{ success: boolean; opId?: string; duplicate?: boolean }>
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
