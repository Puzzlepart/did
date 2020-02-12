
import gql from 'graphql-tag';
import { ITimeEntry } from 'models';

export interface IGetEventData {
  events?: ITimeEntry[];
  totalDuration?: number;
  confirmedDuration?: number;
  weeks?: { id: string, closed: boolean }[];
}

export default gql`
query ($startDateTime: String!, $endDateTime: String!) {
  weeks {
    id
    closed
  }
  eventData(startDateTime: $startDateTime, endDateTime: $endDateTime) {
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
      projectKey
      customerKey
      project {
        id
        key
        name
        icon
        customer {          
          id       
          key
          name
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
      }
      overtime
    } 
    confirmedDuration
  }
}
`;
