import { Project, TimesheetPeriodObject, User } from 'types'

export interface ISummaryViewState {
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
