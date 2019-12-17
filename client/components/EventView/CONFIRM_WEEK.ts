
import gql from 'graphql-tag';

export default gql`
    mutation($entries: [TimeEntryInput!], $yearNumber: Int!, $weekNumber: Int!) {
        result: confirmWeek(entries: $entries, yearNumber: $yearNumber, weekNumber: $weekNumber) {
            success
	        error
        }
    }
`;
