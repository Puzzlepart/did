
import gql from 'graphql-tag';

export default gql`
{
  notifications {
    id
    type
    severity
    text
    moreLink
  }
}
`;
