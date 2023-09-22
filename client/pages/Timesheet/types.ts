import { DateRangeType } from '@fluentui/react'
import { IUserMessageProps } from 'components'
import { EventObject } from '../../../server/graphql'
import { TimesheetDateRange } from './TimesheetDateRange'
import { TimesheetPeriod } from './TimesheetPeriod'
import { TimesheetViewComponent } from './Views/types'

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
   * The currently selected view
   */
  selectedView: TimesheetViewComponent

  /**
   * The current date range
   */
  dateRange: TimesheetDateRange

  /**
   * The current date range type
   */
  dateRangeType: DateRangeType

  /**
   * Loading props for the `<UserMessage />` component
   */
  loading?: IUserMessageProps

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
