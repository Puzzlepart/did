import { ITimesheetState } from './types';
import { TimesheetPeriod } from './TimesheetPeriod';
import { TimesheetScope } from './TimesheetScope';
import _ from 'underscore';

export type ActionType =
    'DATA_UPDATED'
    | 'UPDATE_SCOPE'
    | 'CONFIRMING_PERIOD'
    | 'UNCONFIRMING_PERIOD'
    | 'CHANGE_PERIOD'
    | 'MANUAL_MATCH'
    | 'CLEAR_MANUAL_MATCH'
    | 'IGNORE_EVENT'
    | 'CLEAR_IGNORES';

export const reducer = (state: ITimesheetState, action: { type: ActionType; payload?: any }): ITimesheetState => {
    // eslint-disable-next-line prefer-const
    let newState = { ...state };
    switch (action.type) {
        case 'DATA_UPDATED': {
            newState.loading = action.payload.loading ? { label: 'Loading events', description: 'Please wait...' } : null
            if (action.payload.data) {
                newState.periods = action.payload.data.timesheet.map(period => new TimesheetPeriod(period));
            }
        }
            break;
        case 'CONFIRMING_PERIOD': {
            newState.loading = { label: 'Confirming period', description: 'Hang on a minute...' };
        }
            break;
        case 'UNCONFIRMING_PERIOD': {
            newState.loading = { label: 'Unconfirming period', description: 'Hang on a minute...' };
        }
            break;
        case 'UPDATE_SCOPE': {
            newState.scope = new TimesheetScope(action.payload);
        }
            break;
        case 'CHANGE_PERIOD': {
            newState.selectedPeriodId = action.payload;
        }
            break;
        case 'MANUAL_MATCH': {
            const { selectedPeriod, event, project } = action.payload;
            selectedPeriod.setManualMatch(event.id, project);
            newState.periods = newState.periods.map(p => p.id === newState.selectedPeriodId ? selectedPeriod : p);
        }
            break;
        case 'CLEAR_MANUAL_MATCH': {
            const { selectedPeriod } = newState;
            const { event } = action.payload;
            selectedPeriod.clearManualMatch(event.id);
            newState.periods = newState.periods.map(p => p.id === newState.selectedPeriodId ? selectedPeriod : p);
        }
            break;
        case 'IGNORE_EVENT': {
            const { selectedPeriod } = newState;
            const { event } = action.payload;
            selectedPeriod.ignoreEvent(event.id);
            newState.periods = newState.periods.map(p => p.id === newState.selectedPeriodId ? selectedPeriod : p);
        }
            break;
        case 'CLEAR_IGNORES': {
            const { selectedPeriod } = newState;
            selectedPeriod.clearIgnoredEvents();
            newState.periods = newState.periods.map(p => p.id === newState.selectedPeriodId ? selectedPeriod : p);
        }
            break;
        default: throw new Error();
    }
    if (newState.periods.length > 0) {
        newState.selectedPeriod = _.find(newState.periods, (p: TimesheetPeriod) => p.id === newState.selectedPeriodId) || _.first(newState.periods);
    }
    return newState;
}