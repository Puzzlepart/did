import gql from 'graphql-tag'

export interface IProjectInput {
  key: string
  name: string
  customerKey: string
  description: string
  inactive?: boolean
  icon: string
  labels: any[]
}

export interface ICreateOrUpdateProjectVariables {
  project: IProjectInput
  update?: boolean
}

/**
 * @ignore
 */
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
