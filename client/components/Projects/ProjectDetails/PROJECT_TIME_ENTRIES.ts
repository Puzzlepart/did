import gql from 'graphql-tag';

/**
 * @ignore
 */
export default gql`
    query($projectId: String) {
         timeentries(projectId: $projectId)  {            
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
`;