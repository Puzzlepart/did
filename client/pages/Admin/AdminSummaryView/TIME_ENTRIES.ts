import gql from 'graphql-tag';

/**
 * @ignore
 */
export default gql`
    query($yearNumber: Int!) {
        timeentries(yearNumber: $yearNumber, dateFormat: "LL") {
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
`;