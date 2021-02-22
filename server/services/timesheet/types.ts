import { Project, TimesheetPeriodInput } from '../../graphql/resolvers/types'

export interface IGetTimesheetParams {
  startDate: string
  endDate: string
  locale: string
  dateFormat: string
  tzOffset: number
}

export interface ISubmitPeriodParams {
  /**
   * Period to submit
   */
  period: TimesheetPeriodInput

  /**
   * Timezone offset from client
   */
  tzOffset: number

  /**
   * Forecast
   */
  forecast?: boolean
}

export interface IUnsubmitPeriodParams {
  /**
   * Period to unsubmit
   */
  period: TimesheetPeriodInput

  /**
   * Forecast
   */
  forecast?: boolean
}

export interface IConnectEventsParams extends IGetTimesheetParams {
  projects: Project[]
  events: any[]
}
