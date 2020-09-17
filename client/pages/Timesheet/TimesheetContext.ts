import * as React from 'react'
import { TimesheetAction } from './reducer'
import { ITimesheetState } from './types'

export interface ITimesheetContext extends ITimesheetState {
  onConfirmPeriod: () => void
  onUnconfirmPeriod: () => void
  dispatch?: React.Dispatch<TimesheetAction>
}

export const TimesheetContext = React.createContext<ITimesheetContext>(null)
