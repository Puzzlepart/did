import { IButtonProps } from '@fluentui/react'
import { IDatePeriod } from '../../../../../shared/utils/DateObject'
import { IMissingSubmissionUser } from '../MissingSubmissionUser'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ITeamsReminderButtonProps extends IButtonProps {
  users: IMissingSubmissionUser[]
  period?: IDatePeriod
  topic?: string
}
