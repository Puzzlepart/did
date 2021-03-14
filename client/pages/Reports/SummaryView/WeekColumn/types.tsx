import { TimesheetPeriodObject, User } from 'types'
import { IUseWeekColumnResult } from './useWeekColumn'

export interface IWeekColumnProps {
  user: Pick<User, 'displayName' | 'mail'>
  periods: TimesheetPeriodObject[]
}

export interface IWeekColumnTooltipProps extends IWeekColumnProps {
  hours: IUseWeekColumnResult
}
