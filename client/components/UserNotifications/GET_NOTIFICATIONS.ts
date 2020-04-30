
import gql from 'graphql-tag';
import { IUserNotificationMessage } from './types';

/**
 * @ignore
 */
export interface IGetNotifications {
  notifications: IUserNotificationMessage[];
}

/**
 * @ignore
 */
export default gql`
{
  notifications {
    id
    type
    severity
    dismissable
    text
    moreLink
  }
}
`;
