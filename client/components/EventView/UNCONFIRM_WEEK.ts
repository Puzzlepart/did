
import gql from 'graphql-tag';

export default gql`
    mutation ($yearNumber: Int!, $weekNumber: Int!) {
        result: unconfirmWeek (yearNumber: $yearNumber, weekNumber: $weekNumber) {
            success
	        error
        }
    }
`;