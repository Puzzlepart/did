import { TFunction } from 'i18next'
import { ITimesheetParameters } from '../types'

export interface ITimesheetReducerParameters {
  /**
   * URL parameters
   */
  url: ITimesheetParameters

  /**
   * Translate function
   */
  t?: TFunction
}
