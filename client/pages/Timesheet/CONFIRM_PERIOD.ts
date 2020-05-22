
import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
    mutation($entries: [TimeEntryInput!], $period: TimesheetPeriodInput!) {
        result: confirmPeriod (entries: $entries, period: $period) {
            success
	        error {
                message
            }
        }
    }
`
