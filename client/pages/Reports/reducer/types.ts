/* eslint-disable tsdoc/syntax */
import { IAppContext } from 'AppContext'
import { IReportsParams as IReportsParameters, IReportsQuery } from '../types'

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
  queries: IReportsQuery[]

  /**
   * App context
   */
  app: IAppContext
}
