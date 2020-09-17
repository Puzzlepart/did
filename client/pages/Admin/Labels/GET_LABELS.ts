import gql from 'graphql-tag'

/**
 * @ignore
 */
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
