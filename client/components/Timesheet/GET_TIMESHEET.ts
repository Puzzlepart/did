
import gql from 'graphql-tag';

/**
 * @ignore
 */
export default gql`
query ($startDateTime: String!, $endDateTime: String!, $dateFormat: String!) {
  timesheet(startDateTime: $startDateTime, endDateTime: $endDateTime, dateFormat: $dateFormat) {
    id
    name
    startDateTime
    endDateTime
    events {
      key
      id
      title
      isOrganizer
      webLink
      durationMinutes
      durationHours
      startTime
      endTime
      date
      project {
        id
        key
        name
        description
        icon
        customer {          
          id       
          key
          name
          inactive
        }
      }
      suggestedProject {
        id
        key
        name
        description
        customer {   
          id       
          key
          name
          inactive
        }
      }
      customer {
        id
        key
        name
        inactive
      }      
	    error {
        message
      }
    } 
    confirmedDuration
  }
}
`;
