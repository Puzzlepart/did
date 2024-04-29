import {
  Customer,
  LabelObject as Label,
  Project
} from '../../../graphql/resolvers/types'
import { Extension, ExtensionMetadata } from '../document/types'

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

export class ProjectResourcesExtension extends Extension {
  public id = '2dfbce96-947f-4c26-95b4-5eda10616074'
  public metadata: ExtensionMetadata = {
    status: 'Available',
    description: 'Project resources'
  }
}

export class ProjectRoleDefinitionsExtension extends Extension {
  public id = '3f04bf7b-2a80-4e28-843d-64d1bd622ea7'
  public metadata: ExtensionMetadata = {
    status: 'Available',
    description: 'Project role definitions'
  }
}

export class BudgetTrackingExtension extends Extension {
  public id = '4bb5dfa9-a742-4692-8aa9-86de79961a70'
  public metadata: ExtensionMetadata = {
    status: 'Available',
    description: 'Budget tracking'
  }
}