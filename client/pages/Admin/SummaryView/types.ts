import { IProgressProps } from 'components/Progress/types'
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

  /**
   * Progress
   */
  progress?: IProgressProps
}
