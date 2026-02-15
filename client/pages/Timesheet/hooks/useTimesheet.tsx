import { useCallback, useMemo } from 'react'
import { ITimesheetContext } from '../context'
import { CLEAR_IGNORES, IGNORE_ALL, IGNORE_EVENT } from '../reducer/actions'
import { GetEventsOption } from '../types/TimesheetPeriod'
import { useTimesheetReducer } from '../reducer'
import { useSubmitActions } from './useSubmitActions'
import { useTimesheetEventIgnored } from './useTimesheetEventIgnored'
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
  const { setIgnored, ignoreAll, clearIgnored } = useTimesheetEventIgnored()

  useTimesheetHistory(state)

  const submitActions = useSubmitActions({
    state,
    dispatch,
    refetch
  })

  /**
   * Ignore an event - updates local state AND persists to server
   */
  const onIgnoreEvent = useCallback(
    async (periodId: string, eventId: string, ignored: boolean) => {
      // Update local state immediately for responsive UI
      dispatch(IGNORE_EVENT({ id: eventId }))
      // Persist to server (fire and forget - server is source of truth on reload)
      return setIgnored(periodId, eventId, ignored)
    },
    [dispatch, setIgnored]
  )

  /**
   * Ignore all unmatched events - updates local state AND persists to server
   */
  const onIgnoreAll = useCallback(async () => {
    const periodId = state.selectedPeriod?.id
    if (!periodId) return { success: false }

    // Get unmatched event IDs before dispatching (state will change)
    const unmatchedEventIds = state.selectedPeriod
      .getEvents(GetEventsOption.UnmatchedEvents)
      .map((event) => event.id)

    // Update local state immediately for responsive UI
    dispatch(IGNORE_ALL())

    // Persist to server
    return ignoreAll(periodId, unmatchedEventIds)
  }, [dispatch, ignoreAll, state.selectedPeriod])

  /**
   * Clear all ignored events - updates local state AND persists to server
   */
  const onClearIgnored = useCallback(async () => {
    const periodId = state.selectedPeriod?.id
    if (!periodId) return { success: false }

    // Update local state immediately for responsive UI
    dispatch(CLEAR_IGNORES())

    // Persist to server
    return clearIgnored(periodId)
  }, [dispatch, clearIgnored, state.selectedPeriod])

  return useMemo<ITimesheetContext>(
    () => ({
      ...submitActions,
      state,
      refetch,
      dispatch,
      onIgnoreEvent,
      onIgnoreAll,
      onClearIgnored
    }),
    [state]
  )
}
