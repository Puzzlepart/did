
import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
    query($sortBy: String) {
        customers(sortBy: $sortBy) {
            key
            name
            description
            webLink
            externalSystemURL
            icon
            inactive
        }
    }`
