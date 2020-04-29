
import gql from 'graphql-tag';

/**
 * @ignore
 */
export default gql`
    mutation ($startDateTime: String!, $endDateTime: String!) {
        result: unconfirmPeriod (startDateTime: $startDateTime, endDateTime: $endDateTime) {
            success
	        error {
                message
            }
        }
    }
`;