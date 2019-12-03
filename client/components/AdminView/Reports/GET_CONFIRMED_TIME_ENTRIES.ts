import gql from 'graphql-tag';

export const GET_CONFIRMED_TIME_ENTRIES = gql`
    query {
        result: getConfirmedTimeEntries(dateFormat: "LL")  {
            entries {
                title
                projectId
                durationHours
                startTime
                endTime
                weekNumber
                yearNumber
                resourceName
            }
        }
    }
`;