import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
    query($year: Int!, $minMonthNumber: Int!) {
        timeentries(year: $year, minMonthNumber: $minMonthNumber) {
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