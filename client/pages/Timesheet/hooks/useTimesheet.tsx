import { useCallback, useMemo } from 'react'
import { ITimesheetContext } from '../context'
import { CLEAR_IGNORES, IGNORE_ALL, IGNORE_EVENT } from '../reducer/actions'
import { GetEventsOption, TimesheetPeriod } from '../types/TimesheetPeriod'
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
    (periodId: string, eventId: string, ignored: boolean) => {
      // Update local state immediately for responsive UI
      dispatch(IGNORE_EVENT({ id: eventId }))
      // Persist to server (fire and forget - server is source of truth on reload)
      return setIgnored(periodId, eventId, ignored)
    },
    [dispatch, setIgnored]
  )

  /**
   * Ignore all unmatched events - updates local state AND persists to server.
   * Derives periodId and eventIds from current state.
   */
  const onIgnoreAll = useCallback(() => {
    const period = state.selectedPeriod as TimesheetPeriod
    if (!period?.id) {
      return Promise.resolve({ success: false })
    }
    // Get unmatched event IDs before updating state
    const eventIds = period
      .getEvents(GetEventsOption.UnmatchedEvents)
      .map((e) => e.id)
    if (eventIds.length === 0) {
      return Promise.resolve({ success: false })
    }
    // Update local state immediately for responsive UI
    dispatch(IGNORE_ALL())
    // Persist to server
    return ignoreAll(period.id, eventIds)
  }, [dispatch, ignoreAll, state.selectedPeriod])

  /**
   * Clear all ignored events - updates local state AND persists to server
   */
  const onClearIgnored = useCallback(() => {
    const periodId = state.selectedPeriod?.id
    if (!periodId) {
      return Promise.resolve({ success: false })
    }

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
