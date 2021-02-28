/* eslint-disable tsdoc/syntax */
import { useMemo } from 'react'
import { ITimesheetContext } from '../types'
import hotkeys from './hotkeys'

/**
 * Hook for hotkeys
 *
 * @param context - Context
 *
 * @category Timesheet Hooks
 */
export function useHotkeys(context: ITimesheetContext) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const hotkeysProps = useMemo(() => hotkeys(context), [context.scope])
  return { hotkeysProps }
}
