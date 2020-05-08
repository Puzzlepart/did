import resource from 'i18n';
import { IProject } from 'interfaces';
import _ from 'underscore';
import { TimesheetPeriod } from './TimesheetPeriod';
import { ITimesheetScopeOptions, TimesheetScope } from './TimesheetScope';
import { ITimesheetState } from './types';

export type TimesheetAction =
    { type: 'DATA_UPDATED'; payload: { data: { timesheet: TimesheetPeriod[] }; loading: boolean } }
    | { type: 'MOVE_SCOPE'; payload: ITimesheetScopeOptions | string }
    | { type: 'CONFIRMING_PERIOD' }
    | { type: 'UNCONFIRMING_PERIOD' }
    | { type: 'CHANGE_PERIOD'; payload: string }
    | { type: 'MANUAL_MATCH'; payload: { eventId: string; project: IProject } }
    | { type: 'CLEAR_MANUAL_MATCH'; payload: string }
    | { type: 'IGNORE_EVENT'; payload: string }
    | { type: 'CLEAR_IGNORES' };

/**
 * Reducer for Timesheet
 * 
 * @param {ITimesheetState} state State
 * @param {IAction} action Action
 */
export const reducer = (state: ITimesheetState, action: TimesheetAction): ITimesheetState => {
    const newState = { ...state };
    switch (action.type) {
        case 'DATA_UPDATED': {
            newState.loading = action.payload.loading && {
                label: resource('TIMESHEET.LOADING_EVENTS_LABEL'),
                description: resource('TIMESHEET.LOADING_EVENTS_DESCRIPTION'),
            };
            if (action.payload.data) {
                newState.periods = action.payload.data.timesheet.map(period => new TimesheetPeriod(period));
                newState.selectedPeriod = _.first(newState.periods);
            }
        }
            break;

        case 'CONFIRMING_PERIOD':
            newState.loading = {
                label: resource('TIMESHEET.CONFIRMING_PERIOD_LABEL'),
                description: resource('TIMESHEET.CONFIRMING_PERIOD_DESCRIPTION'),
            };
            break;

        case 'UNCONFIRMING_PERIOD':
            newState.loading = {
                label: resource('TIMESHEET.UNCONFIRMING_PERIOD_LABEL'),
                description: resource('TIMESHEET.UNCONFIRMING_PERIOD_DESCRIPTION'),
            };
            break;

        case 'MOVE_SCOPE':
            if (typeof action.payload === 'string') {
                newState.scope = new TimesheetScope(action.payload);
            } else {
                newState.scope = state.scope.add(action.payload);
            }
            break;

        case 'CHANGE_PERIOD': {
            newState.selectedPeriod = _.find(newState.periods, (p: TimesheetPeriod) => p.id === action.payload);
        }
            break;

        case 'MANUAL_MATCH': {
            const { eventId, project } = action.payload;
            newState.selectedPeriod.setManualMatch(eventId, project);
            newState.periods = newState.periods.map(p => p.id === newState.selectedPeriod.id ? newState.selectedPeriod : p);
        }
            break;

        case 'CLEAR_MANUAL_MATCH': {
            newState.selectedPeriod.clearManualMatch(action.payload);
            newState.periods = newState.periods.map(p => p.id === newState.selectedPeriod.id ? newState.selectedPeriod : p);
        }
            break;

        case 'IGNORE_EVENT': {
            newState.selectedPeriod.ignoreEvent(action.payload);
            newState.periods = newState.periods.map(p => p.id === newState.selectedPeriod.id ? newState.selectedPeriod : p);
        }
            break;

        case 'CLEAR_IGNORES': {
            newState.selectedPeriod.clearIgnoredEvents();
            newState.periods = newState.periods.map(p => p.id === newState.selectedPeriod.id ? newState.selectedPeriod : p);
        }
            break;

        default: throw new Error();
    }
    return newState;
}