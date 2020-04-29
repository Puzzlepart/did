import gql from 'graphql-tag';

/**
 * @ignore
 */
export default gql`
    query {
        result: confirmedTimeEntries(dateFormat: "LL")  {
            entries {
                title
                projectId
                durationHours
                startTime
                endTime
                weekNumber
                yearNumber
                resourceName     
                monthNumber           
                customer {
                    id
                    name
                }
            }
        }
    }
`;