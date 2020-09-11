import gql from 'graphql-tag'

export interface ITimeEntriesVariables {
    year: number;
    minMonthNumber?: number;
    maxMonthNumber?: number;
    minWeekNumber?: number;
    maxWeekNumber?: number;
}

/**
 * @ignore
 */
export default gql`
    query(
        $year: Int!, 
        $minMonthNumber: Int, 
        $maxMonthNumber: Int, 
        $minWeekNumber: Int, 
        $maxWeekNumber: Int) {
        timeentries(
            year: $year, 
            minMonthNumber: $minMonthNumber, 
            maxMonthNumber: $maxMonthNumber, 
            minWeekNumber: $minWeekNumber, 
            maxWeekNumber: $maxWeekNumber) {
            duration
            weekNumber
            year
            monthNumber
            resourceName   
            project {
                id
                name
                icon
            }
            customer {
                key
                name
            }   
        }
    }
`