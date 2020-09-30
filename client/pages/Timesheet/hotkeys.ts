import { TFunction } from 'i18next'
import { GlobalHotKeysProps } from 'react-hotkeys'
import { ITimesheetContext } from './context'

export default (context: ITimesheetContext, t: TFunction): GlobalHotKeysProps => ({
  keyMap: {
    GO_TO_CURRENT_WEEK: {
      name: t('timesheet.goToCurrentWeek'),
      sequence: 'SHIFT+DOWN',
      action: 'keydown',
    },
    PREV_WEEK: {
      name: t('timesheet.goToPrevWeek'),
      sequence: 'SHIFT+LEFT',
      action: 'keydown',
    },
    NEXT_WEEK: {
      name: t('timesheet.goToNextWeek'),
      sequence: 'SHIFT+RIGHT',
      action: 'keydown',
    },
    SHOW_SHORTCUTS: {
      name: t('common.showShortcutsText'),
      sequence: 'SHIFT+I',
      action: 'keydown',
    },
  },
  handlers: {
    GO_TO_CURRENT_WEEK: () =>
      context.dispatch({
        type: 'MOVE_SCOPE',
        payload: new Date().toISOString(),
      }),
    PREV_WEEK: () =>
      context.dispatch({
        type: 'MOVE_SCOPE',
        payload: { amount: -1, unit: 'week' },
      }),
    NEXT_WEEK: () =>
      context.dispatch({
        type: 'MOVE_SCOPE',
        payload: { amount: 1, unit: 'week' },
      }),
    SHOW_SHORTCUTS: () => context.dispatch({ type: 'TOGGLE_SHORTCUTS' }),
  },
  allowChanges: false,
})
