import { IPivotItemProps } from 'office-ui-fabric-react'
import { Project, TimesheetPeriodObject, User } from 'types'

export interface ISummaryViewScope extends IPivotItemProps {
  /**
   * Field name
   */
  fieldName: string

  /**
   * Get column header for the specified index
   */
  getColumnHeader: (index: number) => string
}

export interface ISummaryViewState {
  /**
   * Selected scope
   */
  scope: ISummaryViewScope

  /**
   * Users
   */
  users: User[]

  /**
   * Periods
   */
  periods: TimesheetPeriodObject[]

  /**
   * Projects
   */
   projects: Project[]
}
