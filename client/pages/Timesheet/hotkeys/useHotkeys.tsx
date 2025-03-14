import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ITimesheetContext } from '../context'
import { getHotkeys } from './config'

/**
 * Hook for hotkeys
 *
 * @param context - Context
 *
 * @category Timesheet Hooks
 */
export function useHotkeys(context: ITimesheetContext) {
  const { t } = useTranslation()
  const hotkeysProps = useMemo(() => getHotkeys(context, t), [])
  return { hotkeysProps }
}
