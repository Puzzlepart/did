import gql from 'graphql-tag'
import { IEntityLabel } from 'interfaces'

/**
 * @category LabelPicker
 */
export interface ILabelPickerProps {
    label: string;
    onChange: (labels: IEntityLabel[]) => void
}

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