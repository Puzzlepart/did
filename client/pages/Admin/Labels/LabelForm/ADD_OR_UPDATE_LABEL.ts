import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
    mutation($label: LabelInput!, $update: Boolean) { 
        addOrUpdateLabel(label: $label, update: $update) {
            success
            error {
                message
            }
        }
    }
`