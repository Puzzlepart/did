import { TFunction } from 'i18next'
import React from 'react'
import { GlobalHotKeysProps } from 'react-hotkeys'
import { AnyAction } from 'redux'
import {
  NEXT_PERIOD,
  PREVIOUS_PERIOD,
  SET_SCOPE,
  TOGGLE_SHORTCUTS
} from '../reducer/actions'
import { TimesheetScope } from '../TimesheetScope'

export const getHotkeys = (
  dispatch: React.Dispatch<AnyAction>,
  t: TFunction
): GlobalHotKeysProps => ({
  keyMap: {
    GO_TO_CURRENT_WEEK: {
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
    GO_TO_CURRENT_WEEK: () =>
      dispatch(SET_SCOPE(new TimesheetScope(new Date()))),
    PREVIOUS_PERIOD: () => dispatch(PREVIOUS_PERIOD()),
    NEXT_PERIOD: () => dispatch(NEXT_PERIOD()),
    SHOW_SHORTCUTS: () => dispatch(TOGGLE_SHORTCUTS())
  },
  allowChanges: false
})
