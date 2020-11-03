import gql from 'graphql-tag'
import { LabelObject } from 'types'

export interface ILabelPickerProps {
  className?: string
  label: string
  searchLabelText: string
  defaultSelectedKeys?: string[]
  onChange: (labels: LabelObject[]) => void
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
