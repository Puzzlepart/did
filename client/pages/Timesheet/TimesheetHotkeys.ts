import { GlobalHotKeysProps } from 'react-hotkeys';
import { ITimesheetContext } from './TimesheetContext';

export default (context: ITimesheetContext): GlobalHotKeysProps => ({
    keyMap: {
        PREV_WEEK: 'SHIFT+LEFT',
        NEXT_WEEK: 'SHIFT+RIGHT'
    },
    handlers: {
        PREV_WEEK: () => context.dispatch({ type: 'MOVE_SCOPE', payload: { amount: -1, unit: 'week' } }),
        NEXT_WEEK: () => context.dispatch({ type: 'MOVE_SCOPE', payload: { amount: 1, unit: 'week' } })
    },
    allowChanges: true,
});