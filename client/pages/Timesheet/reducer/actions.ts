import { QueryResult } from '@apollo/client'
import { createAction } from '@reduxjs/toolkit'
import { Project } from 'types'
import { TimesheetScope } from '../TimesheetScope'
import { TimesheetView } from '../types'

export const DATA_UPDATED = createAction<{ query: QueryResult }>('DATA_UPDATED')
export const SET_SCOPE = createAction<{ scope: TimesheetScope }>('SET_SCOPE')
export const SUBMITTING_PERIOD = createAction<{ forecast: boolean }>('SUBMITTING_PERIOD')
export const UNSUBMITTING_PERIOD = createAction<{ forecast: boolean }>('UNSUBMITTING_PERIOD')
export const CHANGE_PERIOD = createAction<{ id: string }>('CHANGE_PERIOD')
export const CHANGE_VIEW = createAction<{ view: TimesheetView }>('CHANGE_VIEW')
export const MANUAL_MATCH = createAction<{ eventId: string; project: Project }>('MANUAL_MATCH')
export const CLEAR_MANUAL_MATCH = createAction<{ id: string }>('CLEAR_MANUAL_MATCH')
export const IGNORE_EVENT = createAction<{ id: string }>('IGNORE_EVENT')
export const CLEAR_IGNORES = createAction('CLEAR_IGNORES')
export const TOGGLE_SHORTCUTS = createAction('TOGGLE_SHORTCUTS')