import gql from 'graphql-tag'


/**
 * @ignore
 */
export default gql`
    mutation($role: RoleInput!, $update: Boolean) { 
        addOrUpdateRole(role: $role, update: $update) {
            success
            error {
                message
            }
        }
    }
`