/* eslint-disable tsdoc/syntax */
import { IProgressProps } from 'components/Progress/types'
import { TimesheetPeriod } from './TimesheetPeriod'
import { TimesheetScope } from './TimesheetScope'

/**
 * @category Timesheet
 */
export type TimesheetView = 'overview' | 'summary' | 'allocation'

/**
 * @category Timesheet
 */
export interface ITimesheetState {
  /**
   * Periods for the seleted scope
   */
  periods: TimesheetPeriod[]

  /**
   * The currently selected period
   */
  selectedPeriod?: TimesheetPeriod

  /**
   * The currently seelcted view
   */
  selectedView: TimesheetView

  /**
   * The current scope
   */
  scope: TimesheetScope

  /**
   * Loading props
   */
  loading?: IProgressProps

  /**
   * Error
   */
  error?: any

  /**
   * Show hotkeys modal
   */
  showHotkeysModal?: boolean

  /**
   * Navigation history
   */
  navHistory?: string[]
}

/**
 * @category Timesheet
 */
export interface ITimesheetParameters {
  view: TimesheetView
  week: string
  month: string
  year: string
}

export * from './context'
export * from './TimesheetPeriod'
export * from './TimesheetScope'
