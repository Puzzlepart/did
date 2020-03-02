
import gql from 'graphql-tag';

export default gql`
query {
  labels {
    id
    name
    description
    color
  }
}
`;
