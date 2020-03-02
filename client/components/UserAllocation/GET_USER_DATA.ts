
import gql from 'graphql-tag';
import { IProject, ICustomer } from 'interfaces';

export interface ITimeEntry {
  durationHours: number;
  project: IProject;
  customer: ICustomer;
}

export default gql`
query ($resourceId: String, $weekNumber: Int, $yearNumber: Int, $currentUser: Boolean) {
  result: confirmedTimeEntries(resourceId: $resourceId, weekNumber: $weekNumber, yearNumber: $yearNumber, currentUser: $currentUser) {
    entries {
      durationHours
      project {
        id
        key
        name
      }
      customer {
        id
        key
        name
      }
    }
  }
}
`;
