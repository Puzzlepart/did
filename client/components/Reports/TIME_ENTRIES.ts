import gql from 'graphql-tag';

/**
 * @ignore
 */
export default gql`
    query {
         timeentries(dateFormat: "LL")  {
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
`;