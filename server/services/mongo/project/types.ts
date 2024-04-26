import {
  Customer,
  LabelObject as Label,
  Project
} from '../../../graphql/resolvers/types'

export type ProjectsData = {
  projects: Project[]
  customers: Customer[]
  labels: Label[]
}

export type GetProjectsDataOptions = {
  includeLabels?: boolean
  includeCustomers?: boolean
  cache?: boolean
}

export const DefaultGetProjectsDataOptions: GetProjectsDataOptions = {
  includeCustomers: true,
  includeLabels: true,
  cache: true
}
