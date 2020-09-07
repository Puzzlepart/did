import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
    query(
        $weekNumber: Int,
        $monthNumber: Int,
        $year: Int
    ) {
         timeentries(
             weekNumber: $weekNumber,
             monthNumber: $monthNumber,
             year: $year,
        ) {
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