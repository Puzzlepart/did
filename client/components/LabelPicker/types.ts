import gql from 'graphql-tag'
import { IEntityLabel } from 'types'

export interface ILabelPickerProps {
  className?: string
  label: string
  searchLabelText: string
  defaultSelectedKeys?: string[]
  onChange: (labels: IEntityLabel[]) => void
}

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
