import { Project, TimesheetPeriodObject, User } from 'types'
import { IUseWeekColumnResult } from './useWeekColumn'

export interface IWeekColumnProps {
  user: Pick<User, 'displayName' | 'mail'>
  periods: TimesheetPeriodObject[]
  projects: Project[]
}

export interface IWeekColumnTooltipProps extends IWeekColumnProps {
  hours: IUseWeekColumnResult
}
