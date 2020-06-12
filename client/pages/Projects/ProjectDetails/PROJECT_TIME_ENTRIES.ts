import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
    query($projectId: String) {
         timeentries(projectId: $projectId)  {            
            title
            duration
            startDateTime
            endDateTime
            weekNumber
            monthNumber
            year
            resourceName            
        }
    }
`