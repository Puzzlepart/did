import { ITimesheetContext, TimesheetContext } from 'pages/Timesheet/context'
import {
  MANUAL_MATCH,
  TOGGLE_MANUAL_MATCH_PANEL
} from 'pages/Timesheet/reducer/actions'
import { useContext } from 'react'
import { Project } from 'types'

/**
 * Hook that returns the necessary props and functions for the manual match panel.
 *
 * @returns An object containing the following properties:
 * - isOpen: A boolean indicating whether the manual match panel is open.
 * - onDismiss: A callback function to dismiss the manual match panel.
 * - event: The event to match.
 * - onMatch: A callback function to manually match the event to a project.
 */
export function useMatchEventPanel() {
  const { state, dispatch } = useContext<ITimesheetContext>(TimesheetContext)
  const event = state.eventToMatch

  /**
   * On manual match. Dispatches action type MANUAL_MATCH
   *
   * @param project - Project to match the event to
   */
  const onMatch = (project: Project) => {
    dispatch(MANUAL_MATCH({ eventId: event.id, project }))
  }

  /**
   * Callback function to dismiss the manual match panel.
   */
  const onDismiss = () => {
    dispatch(TOGGLE_MANUAL_MATCH_PANEL())
  }

  return {
    isOpen: !!event,
    onDismiss,
    event,
    onMatch
  }
}
