/* eslint-disable unicorn/empty-brace-spaces */
/* eslint-disable unicorn/no-array-callback-reference */
import {
  Customer,
  Project,
  TimeEntry,
  User
} from '../../graphql/resolvers/types'

export type Report = TimeEntry[]

export interface IGenerateReportParameters {
  timeEntries: TimeEntry[]
  sortAsc: boolean
  users?: User[]
  projects: Project[]
  customers: Customer[]
}
