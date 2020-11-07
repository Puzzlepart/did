import { gql } from '@apollo/client'

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
