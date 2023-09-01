import { ITabProps } from 'components/Tabs'
import { IMissingSubmissionUser } from '../MissingSubmissionUser'
import { IMissingSubmissionPeriod } from '../useMissingSubmissions'

export interface IListProps extends ITabProps {
  users?: IMissingSubmissionUser[]
  period?: IMissingSubmissionPeriod
}
