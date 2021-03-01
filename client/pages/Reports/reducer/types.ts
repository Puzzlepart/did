/* eslint-disable tsdoc/syntax */
import { IAppContext } from 'AppContext'
import { IReportsParameters, IReportsQueryPresetItem } from '../types'

/**
 * @category Reports
 */
export interface IReportsReducerParameters {
  /**
   * URL parameters
   */
  url: IReportsParameters

  /**
   * Queries
   */
  queries: IReportsQueryPresetItem[]

  /**
   * App context
   */
  app: IAppContext
}
