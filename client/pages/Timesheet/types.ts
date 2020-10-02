import { IProgressIndicatorProps } from 'office-ui-fabric-react/lib/ProgressIndicator'
import { TimesheetPeriod } from './TimesheetPeriod'
import { TimesheetScope } from './TimesheetScope'


export type TimesheetView = 'overview' | 'summary' | 'allocation'


export interface ITimesheetState {
  periods: TimesheetPeriod[]
  selectedPeriod: TimesheetPeriod
  selectedView: TimesheetView
  scope: TimesheetScope
  loading?: IProgressIndicatorProps
  showHotkeysModal?: boolean
}

export interface ITimesheetParams {
  view: TimesheetView
  week: string
  month: string
  year: string
}

export * from './context'
export * from './TimesheetPeriod'
export * from './TimesheetScope'
