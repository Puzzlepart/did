import { IDatePeriod } from 'DateUtils'
import { IMissingSubmissionUser } from './MissingSubmissionUser'

export interface IMissingSubmissionPeriod extends IDatePeriod {
  users?: IMissingSubmissionUser[]
}
