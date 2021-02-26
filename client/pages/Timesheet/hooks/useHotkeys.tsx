import { useMemo } from 'react'
import { ITimesheetContext } from '../types'
import hotkeys from './hotkeys'

/**
 * Hook for hotkeys
 *
 * @param {ITimesheetContext} context Context
 */
export function useHotkeys(context: ITimesheetContext) {
  const hotkeysProps = useMemo(() => hotkeys(context), [context])
  return { hotkeysProps }
}
