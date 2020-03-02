
import gql from 'graphql-tag';

export default gql`
    mutation($id: String!) { 
        deleteLabel(id: $id) {
            success
            error
        }
    }
`;