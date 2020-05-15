import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
    query($year: Int!) {
        timeentries(year: $year, dateFormat: "LL") {
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
                id
                name
            }
        }
    }
`