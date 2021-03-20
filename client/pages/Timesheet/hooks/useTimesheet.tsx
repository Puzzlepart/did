/* eslint-disable tsdoc/syntax */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react'
import { useTimesheetReducer } from '../reducer'
import { ITimesheetContext } from '../types'
import { useSubmitActions } from './useSubmitActions'
import { useTimesheetHistory } from './useTimesheetHistory'
import { useTimesheetQuery } from './useTimesheetQuery'

/**
 * Hook for Timesheet
 *
 * * Reacts to state changes and updates history
 * using `useTimesheetHistory`
 * * Using `useTimesheetReducer` to handle state
 * and dispatching actions
 * * Using `useTimesheetQuery` with timesheet.gql
 *
 * @returns Timesheet context
 *
 * @category Timesheet Hooks
 */
export function useTimesheet() {
  const [state, dispatch] = useTimesheetReducer()
  const refetch = useTimesheetQuery(state, dispatch)

  useTimesheetHistory(state)

  const { onSubmitPeriod, onUnsubmitPeriod } = useSubmitActions({
    state,
    dispatch,
    refetch
  })

  const context = useMemo<ITimesheetContext>(
    () => ({
      ...state,
      refetch,
      onSubmitPeriod,
      onUnsubmitPeriod,
      dispatch
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  )
  return {
    state,
    dispatch,
    context,
    onSubmitPeriod,
    onUnsubmitPeriod
  }
}
