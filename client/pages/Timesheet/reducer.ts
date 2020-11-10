import { QueryResult } from '@apollo/client'
import { getValue } from 'helpers'
import { TFunction } from 'i18next'
import { Project, TimesheetPeriodObject } from 'types'
import { find, first } from 'underscore'
import { DateInput } from 'utils/date'
import { ITimesheetParams, ITimesheetState, TimesheetPeriod, TimesheetView } from './types'

export type TimesheetAction =
  | {
      type: 'DATA_UPDATED'
      payload: {
        query: QueryResult<{ timesheet: TimesheetPeriodObject[] }>
        t: TFunction
        params: ITimesheetParams
      }
    }
  | { type: 'SET_SCOPE'; payload?: DateInput }
  | { type: 'SUBMITTING_PERIOD'; payload: { t: TFunction; forecast: boolean } }
  | { type: 'UNSUBMITTING_PERIOD'; payload: { t: TFunction; forecast: boolean } }
  | { type: 'CHANGE_PERIOD'; payload: string }
  | { type: 'CHANGE_VIEW'; payload: TimesheetView }
  | { type: 'MANUAL_MATCH'; payload: { eventId: string; project: Project } }
  | { type: 'CLEAR_MANUAL_MATCH'; payload: string }
  | { type: 'IGNORE_EVENT'; payload: string }
  | { type: 'CLEAR_IGNORES' }
  | { type: 'TOGGLE_SHORTCUTS' }

/**
 * Reducer for Timesheet
 *
 * @param {ITimesheetState} state State
 * @param {IAction} action Action
 */
export default (state: ITimesheetState, action: TimesheetAction): ITimesheetState => {
  const t = getValue<TFunction>(action, 'payload.t')
  const newState: ITimesheetState = { ...state }
  switch (action.type) {
    case 'DATA_UPDATED':
      {
        const { params, query } = action.payload
        const { loading, data, error } = query
        newState.loading = loading
          ? {
              label: t('timesheet.loadingEventsLabel'),
              description: t('timesheet.loadingEventsDescription')
            }
          : null
        if (data) {
          const selectedPeriodId = state.selectedPeriod?.id || [params.week, params.month, params.year].join('_')
          newState.periods = data.timesheet.map((period) => new TimesheetPeriod().initialize(period))
          newState.selectedPeriod = find(newState.periods, (p) => p.id === selectedPeriodId) || first(newState.periods)
        }
        newState.error = error
      }
      break

    case 'SUBMITTING_PERIOD':
      newState.loading = {
        label: action.payload.forecast ? t('timesheet.forecastingPeriodLabel') : t('timesheet.confirmingPeriodLabel'),
        description: action.payload.forecast
          ? t('timesheet.forecastingPeriodDescription')
          : t('timesheet.confirmingPeriodDescription')
      }
      break

    case 'UNSUBMITTING_PERIOD':
      newState.loading = {
        label: action.payload.forecast
          ? t('timesheet.unforecastingPeriodLabel')
          : t('timesheet.unconfirmingPeriodLabel'),
        description: action.payload.forecast
          ? t('timesheet.unforecastingPeriodDescription')
          : t('timesheet.unconfirmingPeriodDescription')
      }
      break
    case 'SET_SCOPE':
      newState.scope = state.scope.set(action.payload || new Date())
      break

    case 'CHANGE_PERIOD':
      {
        newState.selectedPeriod = find(newState.periods, (p: TimesheetPeriod) => p.id === action.payload)
      }
      break

    case 'CHANGE_VIEW':
      {
        newState.selectedView = action.payload
      }
      break

    case 'MANUAL_MATCH':
      {
        const { eventId, project } = action.payload
        newState.selectedPeriod.setManualMatch(eventId, project)
        newState.periods = newState.periods.map((p) =>
          p.id === newState.selectedPeriod.id ? newState.selectedPeriod : p
        )
      }
      break

    case 'CLEAR_MANUAL_MATCH':
      {
        newState.selectedPeriod.clearManualMatch(action.payload)
        newState.periods = newState.periods.map((p) =>
          p.id === newState.selectedPeriod.id ? newState.selectedPeriod : p
        )
      }
      break

    case 'IGNORE_EVENT':
      {
        newState.selectedPeriod.ignoreEvent(action.payload)
        newState.periods = newState.periods.map((p) =>
          p.id === newState.selectedPeriod.id ? newState.selectedPeriod : p
        )
      }
      break

    case 'CLEAR_IGNORES':
      {
        newState.selectedPeriod.clearIgnoredEvents()
        newState.periods = newState.periods.map((p) =>
          p.id === newState.selectedPeriod.id ? newState.selectedPeriod : p
        )
      }
      break

    case 'TOGGLE_SHORTCUTS':
      {
        newState.showHotkeysModal = !newState.showHotkeysModal
      }
      break

    default:
      throw new Error()
  }
  return newState
}
