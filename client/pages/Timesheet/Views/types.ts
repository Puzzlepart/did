import { StyledComponent } from 'types'

/**
 * Represents a functional component that renders a timesheet view.
 */
export interface TimesheetViewComponent extends StyledComponent {
  /**
   * The ID of the view.
   */
  id: string
}
