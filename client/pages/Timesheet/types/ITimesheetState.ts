import { DateRangeType } from '@fluentui/react'
import { IUserMessageProps } from 'components'
import { EventObject } from 'types'
import { TimesheetViewComponent } from '../Views'
import { TimesheetDateRange } from './TimesheetDateRange'
import { TimesheetPeriod } from './TimesheetPeriod'

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
   * Loading props for the `<UserMessage />` component.
   * This is the props for a `<UserMessage />` component
   * that is displayed when the timesheet is loading.
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
