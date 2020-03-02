
import gql from 'graphql-tag';
import { ITimeEntry } from 'interfaces';

export interface ITimesheetData {
  events?: ITimeEntry[];
  totalDuration?: number;
  confirmedDuration?: number;
}

export default gql`
query ($startDateTime: String!, $endDateTime: String!, $dateFormat: String!) {
  timesheet(startDateTime: $startDateTime, endDateTime: $endDateTime, dateFormat: $dateFormat) {
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
        icon
        customer {          
          id       
          key
          name
          inactive
        }        
        labels {
          name
          description
          color
          icon
        }
      }
      suggestedProject {
        id
        key
        name
        customer {   
          id       
          key
          name
        }
      }
      customer {
        id
        key
        name
        inactive
        labels {
          name
          description
          color
          icon
        }
      }      
	    error {
        message
      }
    } 
    confirmedDuration
  }
}
`;
