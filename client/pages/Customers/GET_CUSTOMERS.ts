import gql from 'graphql-tag'

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
