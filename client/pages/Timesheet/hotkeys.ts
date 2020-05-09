import { GlobalHotKeysProps } from 'react-hotkeys';
import { ITimesheetContext } from './TimesheetContext';

export default (context: ITimesheetContext, resource: (key: string) => string): GlobalHotKeysProps => ({
    keyMap: {
        MOVE_CURRENT_WEEK: {
            name: resource('TIMESHEET.MOVE_CURRENT_WEEK'),
            sequence: 'SHIFT+DOWN',
            action: 'keyup'
        },
        PREV_WEEK: {
            name: resource('TIMESHEET.MOVE_PREV_WEEK'),
            sequence: 'SHIFT+LEFT',
            action: 'keyup'
        },
        NEXT_WEEK: {
            name: resource('TIMESHEET.MOVE_NEXT_WEEK'),
            sequence: 'SHIFT+RIGHT',
            action: 'keyup'
        },
        SHOW_SHORTCUTS: {
            name: resource('COMMON.SHOW_SHORTCUTS_TEXT'),
            sequence: 'SHIFT+I',
            action: 'keyup'
        },
    },
    handlers: {
        MOVE_CURRENT_WEEK: () => context.dispatch({ type: 'MOVE_SCOPE', payload: new Date().toISOString() }),
        PREV_WEEK: () => context.dispatch({ type: 'MOVE_SCOPE', payload: { amount: -1, unit: 'week' } }),
        NEXT_WEEK: () => context.dispatch({ type: 'MOVE_SCOPE', payload: { amount: 1, unit: 'week' } }),
        SHOW_SHORTCUTS: () => context.dispatch({ type: 'TOGGLE_SHORTCUTS' }),
    },
    allowChanges: false,
});