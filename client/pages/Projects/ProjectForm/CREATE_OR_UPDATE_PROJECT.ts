import gql from 'graphql-tag'
import { ProjectModel } from './types'

export interface ICreateOrUpdateProjectVariables {
  project: ProjectModel
  update?: boolean
}

export default gql`
  mutation($project: ProjectInput!, $update: Boolean) {
    result: createOrUpdateProject(project: $project, update: $update) {
      success
      error {
        message
      }
    }
  }
`
