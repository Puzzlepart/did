import { DateRangeType } from '@fluentui/react'
import { IProgressProps } from 'components/Progress/types'
import { TimesheetDateRange } from './TimesheetDateRange'
import { TimesheetPeriod } from './TimesheetPeriod'
import { EventObject } from '../../../server/graphql'

/**
 * @category Timesheet
 */
export enum TimesheetView {
  Overview = 'overview',
  Summary = 'summary',
  Allocation = 'allocation'
}

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
   * The current date range
   */
  dateRange: TimesheetDateRange

  /**
   * The current date range type
   */
  dateRangeType: DateRangeType

  /**
   * Loading props
   */
  loading?: IProgressProps

  /**
   * Error object
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

  /**
   * Event to match in the `<MatchEventPanel />`
   */
  eventToMatch?: EventObject
}

/**
 * @category Timesheet
 */
export interface ITimesheetParameters {
  dateRange: string
  view: string
  startDate: string
}

export * from './context'
export * from './TimesheetDateRange'
export * from './TimesheetPeriod'
