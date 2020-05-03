import gql from 'graphql-tag';

/**
 * @ignore
 */
export default gql`
    mutation($label: LabelInput!) { 
        addLabel(label: $label) {
            success
            error {
                message
            }
        }
    }
`;