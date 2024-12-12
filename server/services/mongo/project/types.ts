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

export const ProjectResourcesExtensionId =
  '2dfbce96-947f-4c26-95b4-5eda10616074'
export const ProjectRoleDefinitionsExtensionId =
  '3f04bf7b-2a80-4e28-843d-64d1bd622ea7'
export const BudgetTrackingExtensionId = '4bb5dfa9-a742-4692-8aa9-86de79961a70'

export class ProjectResourcesExtension extends Extension {
  public id = ProjectResourcesExtensionId
  public metadata: ExtensionMetadata = {
    status: 'Available',
    description: 'Project resources'
  }
}

export class ProjectRoleDefinitionsExtension extends Extension {
  public id = ProjectRoleDefinitionsExtensionId
  public metadata: ExtensionMetadata = {
    status: 'Available',
    description: 'Project role definitions'
  }
}

export class BudgetTrackingExtension extends Extension {
  public id = BudgetTrackingExtensionId
  public metadata: ExtensionMetadata = {
    status: 'Available',
    description: 'Budget tracking'
  }
}
