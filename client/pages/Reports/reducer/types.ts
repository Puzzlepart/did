import { IAppContext } from 'AppContext'
import { IReportsParams, IReportsQuery } from '../types'

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
