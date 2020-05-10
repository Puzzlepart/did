
import gql from 'graphql-tag';

/**
 * @ignore
 */
export default gql`
{
    currentUser {
      id
      email
      fullName
      role
      userLanguage
      sub {
        name
      }
    }
  }  
`;
