/* eslint-disable react-hooks/exhaustive-deps */
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
  const hotkeysProps = useMemo(() => getHotkeys(context), [])
  return { hotkeysProps }
}
