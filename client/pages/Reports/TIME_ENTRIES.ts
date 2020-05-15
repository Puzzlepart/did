import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
    query {
         timeentries {
            title
            duration
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
`