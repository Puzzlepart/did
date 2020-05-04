
import gql from 'graphql-tag';

/**
 * @ignore
 */
export default gql`
query {
  users {
    id
    fullName
    role
  }
}
`;
