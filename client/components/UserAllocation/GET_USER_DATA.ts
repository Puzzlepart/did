
import gql from 'graphql-tag';
import { IProject, ICustomer } from 'models';

export interface ITimeEntry {
  durationHours: number;
  project: IProject;
  customer: ICustomer;
}

export default gql`
query ($resourceId: String, $weekNumber: Int, $year: Int, $currentUser: Boolean) {
  result: confirmedTimeEntries(resourceId: $resourceId, weekNumber: $weekNumber, year: $year, currentUser: $currentUser) {
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
