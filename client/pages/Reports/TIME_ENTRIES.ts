import gql from 'graphql-tag'

export interface ITimeEntriesVariables {
  weekNumber?: number
  monthNumber?: number
  year?: number
  forecast?: boolean;
}

/**
 * @ignore
 */
export default gql`
  query($weekNumber: Int, $monthNumber: Int, $year: Int, $forecast: Boolean) {
    timeentries(weekNumber: $weekNumber, monthNumber: $monthNumber, year: $year, forecast: $forecast) {
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
