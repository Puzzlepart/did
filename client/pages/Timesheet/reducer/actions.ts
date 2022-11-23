import { QueryResult } from '@apollo/client'
import { DateRangeType } from '@fluentui/react'
import { createAction } from '@reduxjs/toolkit'
import { Project } from 'types'
import { TimesheetDateRange } from '../TimesheetDateRange'
import { TimesheetView } from '../types'

/**
 * Data updated action
 *
 * @category Timesheet Actions
 */
export const DATA_UPDATED = createAction<{ query: QueryResult }>('DATA_UPDATED')

/**
 * Set date range action
 *
 * @category Timesheet Actions
 */
export const SET_DATE_RANGE = createAction<TimesheetDateRange | string>(
  'SET_DATE_RANGE'
)

/**
 * Submitting period
 *
 * @category Timesheet Actions
 */
export const SUBMITTING_PERIOD =
  createAction<{ forecast: boolean }>('SUBMITTING_PERIOD')

/**
 * Submittng period action
 *
 * @category Timesheet Actions
 */
export const UNSUBMITTING_PERIOD = createAction<{ forecast: boolean }>(
  'UNSUBMITTING_PERIOD'
)

/**
 * Change period action
 *
 * @category Timesheet Actions
 */
export const CHANGE_PERIOD = createAction<{ id: string }>('CHANGE_PERIOD')

/**
 * Previous period action
 *
 * @category Timesheet Actions
 */
export const PREVIOUS_PERIOD = createAction('PREVIOUS_PERIOD')

/**
 * Next period action
 *
 * @category Timesheet Actions
 */
export const NEXT_PERIOD = createAction('NEXT_PERIOD')

/**
 * Change view action
 *
 * @category Timesheet Actions
 */
export const CHANGE_VIEW = createAction<{ view: TimesheetView }>('CHANGE_VIEW')

/**
 * Change date range type action
 *
 * @category Timesheet Actions
 */
export const CHANGE_DATE_RANGE_TYPE = createAction<{
  dateRangeType: DateRangeType
}>('CHANGE_DATE_RANGE_TYPE')

/**
 * Manual match action
 *
 * @category Timesheet Actions
 */
export const MANUAL_MATCH =
  createAction<{ eventId: string; project: Project }>('MANUAL_MATCH')

/**
 * Clear manual match action
 *
 * @category Timesheet Actions
 */
export const CLEAR_MANUAL_MATCH =
  createAction<{ id: string }>('CLEAR_MANUAL_MATCH')

/**
 * Ignore event action
 *
 * @category Timesheet Actions
 */
export const IGNORE_EVENT = createAction<{ id: string }>('IGNORE_EVENT')

/**
 * Clear ignores action
 *
 * @category Timesheet Actions
 */
export const CLEAR_IGNORES = createAction('CLEAR_IGNORES')

/**
 * Ignore all unmatched events action
 *
 * @category Timesheet Actions
 */
export const IGNORE_ALL = createAction('IGNORE_ALL')


/**
 * Toggle shortcuts action
 *
 * @category Timesheet Actions
 */
export const TOGGLE_SHORTCUTS = createAction('TOGGLE_SHORTCUTS')
