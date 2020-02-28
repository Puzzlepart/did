
import gql from 'graphql-tag';

export default gql`
    mutation($customerKey: String!, $projectKey: String!, $name: String!, $icon: String) { 
        result: createProject(customerKey: $customerKey, projectKey: $projectKey, name: $name, icon: $icon) {
            success
            error
        }
    }
`;