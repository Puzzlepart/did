import { TFunction } from 'i18next'
import { GlobalHotKeysProps } from 'react-hotkeys'
import { ITimesheetContext } from '../context'
import {
  NEXT_PERIOD,
  PREVIOUS_PERIOD,
  SET_DATE_RANGE,
  TOGGLE_SHORTCUTS
} from '../reducer/actions'
import { TimesheetDateRange } from '../TimesheetDateRange'

export const getHotkeys = (
  context: ITimesheetContext,
  t: TFunction
): GlobalHotKeysProps => ({
  keyMap: {
    GO_TO_CURRENT_WEEK_MONTH: {
      name: t('timesheet.goToCurrentWeek'),
      sequence: 'SHIFT+DOWN',
      action: 'keydown'
    },
    PREVIOUS_PERIOD: {
      name: t('timesheet.goToPrevWeek'),
      sequence: 'SHIFT+LEFT',
      action: 'keydown'
    },
    NEXT_PERIOD: {
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
    GO_TO_CURRENT_WEEK_MONTH: () =>
      context.dispatch(
        SET_DATE_RANGE(
          new TimesheetDateRange(new Date(), context.state.dateRangeType)
        )
      ),
    PREVIOUS_PERIOD: () => context.dispatch(PREVIOUS_PERIOD()),
    NEXT_PERIOD: () => context.dispatch(NEXT_PERIOD()),
    SHOW_SHORTCUTS: () => context.dispatch(TOGGLE_SHORTCUTS())
  },
  allowChanges: false
})
