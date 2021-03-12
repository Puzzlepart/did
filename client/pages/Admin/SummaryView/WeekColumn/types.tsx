import { Project, TimesheetPeriodObject } from 'types'
import { IUseWeekColumnResult } from './useWeekColumn'

export interface IWeekColumnProps {
  user: string
  periods: TimesheetPeriodObject[]
  projects: Project[]
}

export interface IWeekColumnTooltipProps extends IWeekColumnProps {
  hours: IUseWeekColumnResult
}

