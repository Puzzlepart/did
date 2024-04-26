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
  /**
   * Include labels in the response.
   */
  includeLabels?: boolean

  /**
   * Include customers in the response.
   */
  includeCustomers?: boolean

  /**
   * Use cache for the response.
   */
  cache?: boolean
}

export const DefaultGetProjectsDataOptions: GetProjectsDataOptions = {
  includeCustomers: true,
  includeLabels: true,
  cache: true
}
