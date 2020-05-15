import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
    query($projectId: String) {
         timeentries(projectId: $projectId)  {            
            title
            duration
            startTime
            endTime
            weekNumber
            year
            resourceName            
        }
    }
`