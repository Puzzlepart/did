import gql from 'graphql-tag'


/**
 * @ignore
 */
export default gql`
    mutation($name: String!) { 
        deleteLabel(name: $name) {
            success
            error {
                message
            }
        }
    }
`