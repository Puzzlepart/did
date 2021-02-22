import { Project, TimesheetPeriodInput } from '../../graphql/resolvers/types'

export interface IGetTimesheetParams {
  startDate: string
  endDate: string
  locale: string
  dateFormat: string
  tzOffset: number
}

export interface ISubmitPeriodParams {
  period: TimesheetPeriodInput
  tzOffset: number
}

export interface IUnsubmitPeriodParams {
  period: TimesheetPeriodInput
}

export interface IConnectEventsParams extends IGetTimesheetParams {
  projects: Project[]
  events: any[]
}