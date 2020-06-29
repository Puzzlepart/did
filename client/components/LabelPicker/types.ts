import gql from 'graphql-tag'

/**
 * @category LabelPicker
 */
export type ILabelPickerProps = React.HTMLProps<HTMLDivElement>;

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
`