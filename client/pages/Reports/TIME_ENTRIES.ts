import gql from 'graphql-tag';

/**
 * @ignore
 */
export default gql`
    query {
         timeentries(dateFormat: "MMM DD, YYYY kk:mm")  {
            title
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
            project {
                id
                name
            }
        }
    }
`;