import gql from 'graphql-tag';

/**
 * @ignore
 */
export const ADD_LABEL = gql`
    mutation($label: LabelInput!) { 
        addLabel(label: $label) {
            success
            error {
                message
            }
        }
    }
`;

/**
 * @ignore
 */
export const UPDATE_LABEL = gql`
    mutation($label: LabelInput!) { 
        updateLabel(label: $label) {
            success
            error {
                message
            }
        }
    }
`;

/**
 * @ignore
 */
export const DELETE_LABEL = gql`
    mutation($id: String!) { 
        deleteLabel(id: $id) {
            success
            error {
                message
            }
        }
    }
`;

/**
 * @ignore
 */
export const GET_LABELS = gql`
    query {
        labels {
            id
            name
            description
            color
            icon
        }
    }
`;