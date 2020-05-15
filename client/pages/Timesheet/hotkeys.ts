import { TFunction } from 'i18next';
import { GlobalHotKeysProps } from 'react-hotkeys';
import { ITimesheetContext } from './TimesheetContext';

export default (context: ITimesheetContext, t: TFunction): GlobalHotKeysProps => ({
    keyMap: {
        MOVE_CURRENT_WEEK: {
            name: t('MOVE_CURRENT_WEEK'),
            sequence: 'SHIFT+DOWN',
            action: 'keydown'
        },
        PREV_WEEK: {
            name: t('MOVE_PREV_WEEK'),
            sequence: 'SHIFT+LEFT',
            action: 'keydown'
        },
        NEXT_WEEK: {
            name: t('MOVE_NEXT_WEEK'),
            sequence: 'SHIFT+RIGHT',
            action: 'keydown'
        },
        SHOW_SHORTCUTS: {
            name: t('SHOW_SHORTCUTS_TEXT', { ns: 'COMMON' }),
            sequence: 'SHIFT+I',
            action: 'keydown'
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