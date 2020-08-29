import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
    query($customerKey: String, $sortBy: String) {
        projects(customerKey: $customerKey, sortBy: $sortBy) {
            id
            key
            name
            description
            webLink
            icon
            externalSystemURL
            customerKey
            customer {
                key
                name
            }
            labels {
                id
                name
                description
                color
                icon
            }
            inactive
        }
        outlookCategories { 
            id
            key
            displayName
            color
        }
    }
`
