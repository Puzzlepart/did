/* eslint-disable tsdoc/syntax */
import { IAppContext } from 'AppContext'
import { IReportsParams, IReportsQuery } from '../types'

/**
 * @category Reports
 */
export interface IReportsReducerParams {
  /**
   * URL parameters
   */
  url: IReportsParams

  /**
   * Queries
   */
  queries: IReportsQuery[]

  /**
   * App context
   */
  app: IAppContext
}
