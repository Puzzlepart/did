import { useMemo } from 'react'
import { ITimesheetContext } from '../context'
import { useTimesheetReducer } from '../reducer'
import { useSubmitActions } from './useSubmitActions'
import { useTimesheetHistory } from './useTimesheetHistory'
import { useTimesheetQuery } from './useTimesheetQuery'

/**
 * Component logic for Timesheet. Returns a context object
 * that can be passed down to child components from
 * `Timesheet` component.
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

  const submitActions = useSubmitActions({
    state,
    dispatch,
    refetch
  })

  return useMemo<ITimesheetContext>(
    () => ({
      ...submitActions,
      state,
      refetch,
      dispatch
    }),
    [state]
  )
}
