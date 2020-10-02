import gql from 'graphql-tag'

export interface ITimeEntriesVariables {
  startDateTime?: string;
  endDateTime?: string;
  weekNumber?: number
  monthNumber?: number
  year?: number
  forecast?: boolean
}

export default gql`
  query(
    $startDateTime: String,
    $endDateTime: String,
    $weekNumber: Int, 
    $monthNumber: Int, 
    $year: Int, 
    $forecast: Boolean
    ) {
    timeentries(
      startDateTime: $startDateTime,
      endDateTime: $endDateTime,
      weekNumber: $weekNumber, 
      monthNumber: $monthNumber, 
      year: $year, 
      forecast: $forecast
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
