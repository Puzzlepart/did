
import gql from 'graphql-tag';

export default gql`
    mutation($label: LabelInput!) { 
        addOrUpdateLabel(label: $label) {
            success
            error
        }
    }
`;