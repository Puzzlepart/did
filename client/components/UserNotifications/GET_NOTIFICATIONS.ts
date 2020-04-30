
import gql from 'graphql-tag';
import { IUserNotificationMessage } from './types';

export interface IGetNotifications {
  notifications: IUserNotificationMessage[];
}

export default gql`
{
  notifications {
    id
    type
    severity
    dismissType
    text
    moreLink
  }
}
`;
