import gql from 'graphql-tag'
import { IEntityLabel } from 'interfaces'

/**
 * @category LabelPicker
 */
export interface ILabelPickerProps {
  className?: string
  label: string
  searchLabelText: string
  defaultSelectedKeys?: string[]
  onChange: (labels: IEntityLabel[]) => void
}

/**
 * @ignore
 */
export const GET_LABELS = gql`
  query {
    labels {
      name
      description
      color
      icon
    }
  }
`
