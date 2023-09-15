import { ITabProps } from 'components/Tabs'
import { IMissingSubmissionUser } from '../MissingSubmissionUser'
import { IMissingSubmissionPeriod } from '../types'

export interface IListProps extends ITabProps {
  users?: IMissingSubmissionUser[]
  period?: IMissingSubmissionPeriod
}
