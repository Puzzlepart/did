/* eslint-disable tsdoc/syntax */
import { QueryResult } from '@apollo/client'
import { createAction } from '@reduxjs/toolkit'
import { Project } from 'types'
import { TimesheetScope } from '../TimesheetScope'
import { TimesheetView } from '../types'

/**
 * Data updated action
 *
 * @category Timesheet Actions
 */
export const DATA_UPDATED = createAction<{ query: QueryResult }>('DATA_UPDATED')

/**
 * Set scope action
 *
 * @category Timesheet Actions
 */
export const SET_SCOPE = createAction<TimesheetScope | string>('SET_SCOPE')

/**
 * A utility function to create an action creator for the given action type string.
 * The action creator accepts a single argument, which will be included in the action object
 * as a field called payload. The action creator function will also have its toString()
 * overriden so that it returns the action type, allowing it to be used in reducer logic that is looking for that action type.
 *
 * @category Timesheet Actions
 */
export const SUBMITTING_PERIOD = createAction<{ forecast: boolean }>(
  'SUBMITTING_PERIOD'
)

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
 * Manual match action
 *
 * @category Timesheet Actions
 */
export const MANUAL_MATCH = createAction<{ eventId: string; project: Project }>(
  'MANUAL_MATCH'
)

/**
 * Clear manual match action
 *
 * @category Timesheet Actions
 */
export const CLEAR_MANUAL_MATCH = createAction<{ id: string }>(
  'CLEAR_MANUAL_MATCH'
)

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
 * Toggle shortcuts action
 *
 * @category Timesheet Actions
 */
export const TOGGLE_SHORTCUTS = createAction('TOGGLE_SHORTCUTS')
