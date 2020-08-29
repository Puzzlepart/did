import gql from 'graphql-tag'


/**
 * @ignore
 */
export default gql`
    mutation($id: String!) { 
        deleteLabel(id: $id) {
            success
            error {
                message
            }
        }
    }
`