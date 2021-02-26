import { AnyAction } from '@reduxjs/toolkit'
import { HotkeyModal } from 'components/HotkeyModal'
import React, { Dispatch, useMemo } from 'react'
import { GlobalHotKeys } from 'react-hotkeys'
import { TOGGLE_SHORTCUTS } from '../reducer/actions'
import { ITimesheetContext } from '../types'
import hotkeys from './hotkeys'

/**
 * Hook for hotkeys
 * 
 * @param {ITimesheetContext} context Context
 * @param {Dispatch<AnyAction>} dispatch Dispatch
 */
export function useHotkeys(context: ITimesheetContext,dispatch?: Dispatch<AnyAction>) {
  const hotkeysProps = useMemo(() => hotkeys(context), [context])
  return {
    HotKeysProvider: ({ children }) => (
      <GlobalHotKeys {...hotkeysProps}>
        {children}
        <HotkeyModal
          {...hotkeysProps}
          isOpen={context.showHotkeysModal}
          onDismiss={() => dispatch(TOGGLE_SHORTCUTS())}
        />
      </GlobalHotKeys>
    ),
  }
}
