
import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
    mutation($project: ProjectInput!) { 
        result: createOrUpdateProject(project: $project) {
            success
            error {
                message
            }
        }
    }
`