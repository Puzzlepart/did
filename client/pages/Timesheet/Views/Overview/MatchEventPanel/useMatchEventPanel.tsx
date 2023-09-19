import {
  MANUAL_MATCH,
  TOGGLE_MANUAL_MATCH_PANEL
} from 'pages/Timesheet/reducer/actions'
import { useCallback } from 'react'
import { EventObject, Project } from 'types'
import { useTimesheetContext } from '../../../context'

/**
 * Component logic hook for `MatchEventPanel`.
 *
 * @returns An object containing the following properties:
 * - isOpen: A boolean indicating whether the manual match panel is open.
 * - onDismiss: A callback function to dismiss the manual match panel.
 * - event: The event to match.
 * - onMatch: A callback function to manually match the event to a project.
 */
export function useMatchEventPanel() {
  const { state, dispatch } = useTimesheetContext()
  const event = state.eventToMatch ?? ({} as EventObject)

  /**
   * On manual match. Dispatches action type MANUAL_MATCH
   *
   * @param project - Project to match the event to
   */
  const onMatch = useCallback(
    (project: Project) => {
      dispatch(MANUAL_MATCH({ eventId: state.eventToMatch.id, project }))
    },
    [event]
  )

  /**
   * Callback function to dismiss the manual match panel.
   */
  const onDismiss = useCallback(() => {
    dispatch(TOGGLE_MANUAL_MATCH_PANEL())
  }, [])

  return {
    isOpen: !!state.eventToMatch,
    onDismiss,
    event,
    onMatch
  }
}
