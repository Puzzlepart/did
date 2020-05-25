import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
    query {
         timeentries {
            title
            duration
            startDateTime
            endDateTime
            weekNumber
            monthNumber
            year
            resourceName     
            monthNumber           
            customer {
                key
                name
            }
            project {
                id
                name
            }
        }
    }
`