import gql from 'graphql-tag';

export const GET_PROJECT_CONFIRMED_TIME_ENTRIES = gql`
    query($projectId: String) {
        result: confirmedTimeEntries(projectId: $projectId)  {
            entries {
                title
                durationHours
                durationMinutes
                startTime
                endTime
                weekNumber
                yearNumber
                resourceName
            }
        }
    }
`;