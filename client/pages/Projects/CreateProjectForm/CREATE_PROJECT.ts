
import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
    mutation($project: ProjectInput!) { 
        result: createProject(project: $project) {
            success
            error {
                message
            }
        }
    }
`