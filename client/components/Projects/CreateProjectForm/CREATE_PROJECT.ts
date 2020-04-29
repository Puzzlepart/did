
import gql from 'graphql-tag';

/**
 * @ignore
 */
export default gql`
    mutation($customerKey: String!, $projectKey: String!, $name: String!, $description: String!, $icon: String!) { 
        result: createProject(customerKey: $customerKey, projectKey: $projectKey, name: $name, description: $description, icon: $icon) {
            success
            error {
                message
            }
        }
    }
`;