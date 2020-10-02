import gql from 'graphql-tag'

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
