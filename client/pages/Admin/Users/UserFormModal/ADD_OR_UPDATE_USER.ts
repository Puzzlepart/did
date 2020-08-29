import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
    mutation($user: UserInput!) { 
        addOrUpdateUser(user: $user) {
            success
            error {
                message
            }
        }
    }
`
