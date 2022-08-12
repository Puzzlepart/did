import { IDatePeriod } from '../../../../../shared/utils/DateObject'
import { IMissingSubmissionUser } from '../MissingSubmissionUser'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ITeamsReminderButtonProps {
  users: IMissingSubmissionUser[]
  period?: IDatePeriod
  topic?: string
}
