import { ITimesheetContext, TimesheetContext } from 'pages/Timesheet/context'
import { MANUAL_MATCH } from 'pages/Timesheet/reducer/actions'
import { useContext, useState } from 'react'
import { EventObject, Project } from 'types'

/**
 * Hook for MatchEventPanel
 *
 * @param event - Event
 */
export function useMatchEventPanel(event: EventObject) {
  const { dispatch } = useContext<ITimesheetContext>(TimesheetContext)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const hidePanel = () => setIsPanelOpen(false)
  const showPanel = () => setIsPanelOpen(true)

  /**
   * On manual match. Dispatches action type MANUAL_MATCH
   *
   * @param project - Project to match the event to
   */
  const onMatch = (project: Project) => {
    hidePanel()
    dispatch(MANUAL_MATCH({ eventId: event.id, project }))
  }

  return {
    isPanelOpen,
    hidePanel,
    showPanel,
    onMatch
  }
}
