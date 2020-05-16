import { TFunction } from 'i18next'
import { GlobalHotKeysProps } from 'react-hotkeys'
import { ITimesheetContext } from './TimesheetContext'

export default (context: ITimesheetContext, t: TFunction): GlobalHotKeysProps => ({
    keyMap: {
        goToCurrentWeek: {
            name: t('goToCurrentWeek'),
            sequence: 'SHIFT+DOWN',
            action: 'keydown'
        },
        PREV_WEEK: {
            name: t('goToPrevWeek'),
            sequence: 'SHIFT+LEFT',
            action: 'keydown'
        },
        NEXT_WEEK: {
            name: t('goToNextWeek'),
            sequence: 'SHIFT+RIGHT',
            action: 'keydown'
        },
        SHOW_SHORTCUTS: {
            name: t('showShortcutsText', { ns: 'common' }),
            sequence: 'SHIFT+I',
            action: 'keydown'
        },
    },
    handlers: {
        goToCurrentWeek: () => context.dispatch({ type: 'MOVE_SCOPE', payload: new Date().toISOString() }),
        PREV_WEEK: () => context.dispatch({ type: 'MOVE_SCOPE', payload: { amount: -1, unit: 'week' } }),
        NEXT_WEEK: () => context.dispatch({ type: 'MOVE_SCOPE', payload: { amount: 1, unit: 'week' } }),
        SHOW_SHORTCUTS: () => context.dispatch({ type: 'TOGGLE_SHORTCUTS' }),
    },
    allowChanges: false,
})