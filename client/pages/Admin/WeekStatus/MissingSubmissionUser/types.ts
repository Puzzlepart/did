import { PersonaProps } from '@fluentui/react-components'
import { IDatePeriod } from 'DateUtils'

export interface IMissingSubmissionUser extends PersonaProps {
  email?: string
  periods?: IDatePeriod[]
}

export interface IMissingSubmissionUserProps {
  user: IMissingSubmissionUser
  period?: IDatePeriod
}
