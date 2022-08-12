import { IPersonaProps } from '@fluentui/react'
import { IDatePeriod } from 'DateUtils'

export interface IMissingSubmissionUser extends IPersonaProps {
  email?: string
  lastActive?: Date
  periods?: IDatePeriod[]
}

export interface IMissingSubmissionUserProps {
  user: IMissingSubmissionUser
  period?: IDatePeriod
}
