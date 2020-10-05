import { ApolloQueryResult } from 'apollo-client'
import { createContext } from 'react'
import { TimesheetAction } from './reducer'
import { ITimesheetState } from './types'

export interface ITimesheetContext extends ITimesheetState {
  /**
   * On submit period
   *
   * Confirms or forecasts the period
   */
  onSubmitPeriod: () => void

  /**
   * On unsubmit period
   *
   * Unconfirms or removes forecast for period
   */
  onUnsubmitPeriod: () => void

  /**
   * Dispatch an action
   */
  dispatch?: React.Dispatch<TimesheetAction>

  /**
   * Refetch data
   */
  refetch?: () => Promise<ApolloQueryResult<any>>
}

export const TimesheetContext = createContext<ITimesheetContext>(null)
