import gql from 'graphql-tag';

export const GET_CONFIRMED_TIME_ENTRIES = gql`
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