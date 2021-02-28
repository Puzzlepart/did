import { History } from 'history'
import { IProjectsParams as IProjectsParameters } from '../types'

export interface IProjectsReducerParameters {
  url: IProjectsParameters
  history: History
}
