/* eslint-disable tsdoc/syntax */
import { useMemo } from 'react'
import { ITimesheetContext } from '../types'
import { getHotkeys } from './config'

/**
 * Hook for hotkeys
 *
 * @param context - Context
 *
 * @category Timesheet Hooks
 */
export function useHotkeys(context: ITimesheetContext) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const hotkeysProps = useMemo(() => getHotkeys(context), [context.scope])
  return { hotkeysProps }
}
