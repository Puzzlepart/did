import {
  Customer,
  Project,
  TimesheetPeriodInput
} from '../../graphql/resolvers/types'
import MatchingEngine from './matching'

export type ProjectMatch = { id: string; key: string; customerKey: string }

export interface IGetTimesheetParameters {
  startDate: string
  endDate: string
  tzOffset: number
  locale?: string
  dateFormat?: string
}

export interface IProviderEventsParameters extends IGetTimesheetParameters {
  provider: 'google' | 'azuread-openidconnect'
  engine?: MatchingEngine
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
