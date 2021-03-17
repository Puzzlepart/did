import { GlobalHotKeysProps } from 'react-hotkeys'
import { ITimesheetContext } from '../context'
import { SET_SCOPE, TOGGLE_SHORTCUTS } from '../reducer/actions'
import { TimesheetScope } from '../TimesheetScope'

export const getHotkeys = ({
  dispatch,
  t
}: ITimesheetContext): GlobalHotKeysProps => ({
  keyMap: {
    GO_TO_CURRENT_WEEK: {
      name: t('timesheet.goToCurrentWeek'),
      sequence: 'SHIFT+DOWN',
      action: 'keydown'
    },
    PREV_WEEK: {
      name: t('timesheet.goToPrevWeek'),
      sequence: 'SHIFT+LEFT',
      action: 'keydown'
    },
    NEXT_WEEK: {
      name: t('timesheet.goToNextWeek'),
      sequence: 'SHIFT+RIGHT',
      action: 'keydown'
    },
    SHOW_SHORTCUTS: {
      name: t('common.showShortcutsText'),
      sequence: 'SHIFT+I',
      action: 'keydown'
    }
  },
  handlers: {
    GO_TO_CURRENT_WEEK: () =>
      dispatch(SET_SCOPE(new TimesheetScope(new Date()))),
    PREV_WEEK: () => dispatch(SET_SCOPE('-1w')),
    NEXT_WEEK: () => dispatch(SET_SCOPE('1w')),
    SHOW_SHORTCUTS: () => dispatch(TOGGLE_SHORTCUTS())
  },
  allowChanges: false
})
