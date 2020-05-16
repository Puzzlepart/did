import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
    query($year: Int!) {
        timeentries(year: $year) {
            project {
                id
                name
            }
            duration
            weekNumber
            year
            monthNumber
            resourceName   
            customer {
                key
                name
            }
        }
    }
`