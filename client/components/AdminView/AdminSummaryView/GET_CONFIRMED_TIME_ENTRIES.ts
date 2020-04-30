import gql from 'graphql-tag';

/**
 * @ignore
 */
export default gql`
    query($yearNumber: Int!) {
        result: confirmedTimeEntries(yearNumber: $yearNumber, dateFormat: "LL")  {
            entries {
                project {
                    id
                }
                durationHours
                weekNumber
                yearNumber
                monthNumber
                resourceName   
                customer {
                    id
                    name
                }
            }
        }
    }
`;