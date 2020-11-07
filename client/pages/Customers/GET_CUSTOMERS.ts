import { gql } from '@apollo/client'

export default gql`
  query($sortBy: String) {
    customers(sortBy: $sortBy) {
      key
      name
      description
      icon
      webLink
      externalSystemURL
      inactive
    }
  }
`
