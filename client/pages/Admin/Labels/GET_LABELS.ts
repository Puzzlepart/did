import { gql } from '@apollo/client'

export default gql`
  query {
    labels {
      name
      description
      color
      icon
    }
  }
`
