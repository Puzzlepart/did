
import gql from 'graphql-tag';

export default gql`
    mutation($label: LabelInput!) { 
        addLabel(label: $label) {
            success
            error
        }
    }
`;