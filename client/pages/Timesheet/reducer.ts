import { QueryResult } from '@apollo/client'
import { getValue } from 'helpers'
import { TFunction } from 'i18next'
import { Project } from 'types'
import { find, first } from 'underscore'
import { ITimesheetScopeOptions, ITimesheetState, TimesheetPeriod, TimesheetScope, TimesheetView } from './types'

export type TimesheetAction =
  | {
    type: 'DATA_UPDATED'
    payload: {
      query: QueryResult<any>
      t: TFunction
    }
  }
  | { type: 'MOVE_SCOPE'; payload: ITimesheetScopeOptions | string }
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
  const newState = { ...state }
  switch (action.type) {
    case 'DATA_UPDATED':
      {
        const { loading, data, error } = action.payload.query
        newState.loading = loading
          ? {
            label: t('timesheet.loadingEventsLabel'),
            description: t('timesheet.loadingEventsDescription'),
          }
          : null
        if (data) {
          newState.periods = data.timesheet.map(period => new TimesheetPeriod(period))
          newState.selectedPeriod =
            find(newState.periods, p => p.id === getValue(state, 'selectedPeriod.id', null)) || first(newState.periods)
        }
        newState.error = error
      }
      break

    case 'SUBMITTING_PERIOD':
      newState.loading = {
        label: action.payload.forecast ? t('timesheet.forecastingPeriodLabel') : t('timesheet.confirmingPeriodLabel'),
        description: action.payload.forecast
          ? t('timesheet.forecastingPeriodDescription')
          : t('timesheet.confirmingPeriodDescription'),
      }
      break

    case 'UNSUBMITTING_PERIOD':
      newState.loading = {
        label: action.payload.forecast
          ? t('timesheet.unforecastingPeriodLabel')
          : t('timesheet.unconfirmingPeriodLabel'),
        description: action.payload.forecast
          ? t('timesheet.unforecastingPeriodDescription')
          : t('timesheet.unconfirmingPeriodDescription'),
      }
      break
    case 'MOVE_SCOPE':
      if (typeof action.payload === 'string') newState.scope = new TimesheetScope(action.payload)
      else newState.scope = state.scope.add(action.payload)
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
        newState.periods = newState.periods.map(p =>
          p.id === newState.selectedPeriod.id ? newState.selectedPeriod : p
        )
      }
      break

    case 'CLEAR_MANUAL_MATCH':
      {
        newState.selectedPeriod.clearManualMatch(action.payload)
        newState.periods = newState.periods.map(p =>
          p.id === newState.selectedPeriod.id ? newState.selectedPeriod : p
        )
      }
      break

    case 'IGNORE_EVENT':
      {
        newState.selectedPeriod.ignoreEvent(action.payload)
        newState.periods = newState.periods.map(p =>
          p.id === newState.selectedPeriod.id ? newState.selectedPeriod : p
        )
      }
      break

    case 'CLEAR_IGNORES':
      {
        newState.selectedPeriod.clearIgnoredEvents()
        newState.periods = newState.periods.map(p =>
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
