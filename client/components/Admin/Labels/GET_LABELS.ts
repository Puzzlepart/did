import gql from 'graphql-tag';

/**
 * @ignore
 */
export default gql`
query {
  labels {
    id
    name
    description
    color
    icon
  }
}
`;