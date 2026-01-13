import { ButtonProps } from '@fluentui/react-components'
import { IDatePeriod } from '../../../../../shared/utils/DateObject'
import { IMissingSubmissionUser } from '../MissingSubmissionUser'

export interface ITeamsReminderButtonProps extends ButtonProps {
  users: IMissingSubmissionUser[]
  period?: IDatePeriod
  topic?: string
}
