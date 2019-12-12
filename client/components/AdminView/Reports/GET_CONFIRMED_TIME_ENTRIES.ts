import gql from 'graphql-tag';

export const GET_CONFIRMED_TIME_ENTRIES = gql`
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