import { IProgressProps } from 'components/Progress/types'
import { TimesheetPeriod } from './TimesheetPeriod'
import { TimesheetScope } from './TimesheetScope'

export type TimesheetView = 'overview' | 'summary' | 'allocation'

export interface ITimesheetState {
  periods: TimesheetPeriod[]
  selectedPeriod?: TimesheetPeriod
  selectedView: TimesheetView
  scope: TimesheetScope
  loading?: IProgressProps
  error?: any
  showHotkeysModal?: boolean
}

export interface ITimesheetParameters {
  view: TimesheetView
  week: string
  month: string
  year: string
}

export * from './context'
export * from './TimesheetPeriod'
export * from './TimesheetScope'
