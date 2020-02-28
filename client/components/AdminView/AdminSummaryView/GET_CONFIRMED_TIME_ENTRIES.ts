import gql from 'graphql-tag';

export const GET_CONFIRMED_TIME_ENTRIES = gql`
    query {
        result: confirmedTimeEntries(dateFormat: "LL")  {
            entries {
                title
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