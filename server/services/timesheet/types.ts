import {
  Customer,
  Project,
  TimesheetPeriodInput
} from '../../graphql/resolvers/types'

export interface IGetTimesheetParameters {
  startDate: string
  endDate: string
  locale: string
  dateFormat: string
  tzOffset: number
}

export interface ISubmitPeriodParameters {
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

export interface IUnsubmitPeriodParameters {
  /**
   * Period to unsubmit
   */
  period: TimesheetPeriodInput

  /**
   * Forecast
   */
  forecast?: boolean
}

export interface IConnectEventsParameters extends IGetTimesheetParameters {
  projects: Project[]
  customers: Customer[]
  events: any[]
}

/**
 * Timesheet period data
 */
export interface ITimesheetPeriodData {
  _id: string
  userId: string
  week: number
  month: number
  year: number
  hours?: number
  forecastedHours?: number
  events?: any[]
}
