import { TimesheetPeriodObject, User } from 'types'

export interface IPeriodColumnProps {
  user: Pick<User, 'displayName' | 'mail'>
  periods: TimesheetPeriodObject[]
}