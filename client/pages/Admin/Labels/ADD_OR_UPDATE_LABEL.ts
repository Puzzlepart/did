import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
    mutation($label: LabelInput!) { 
        addOrUpdateLabel(label: $label) {
            success
            error {
                message
            }
        }
    }
`