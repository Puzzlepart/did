
import gql from 'graphql-tag'
import { IUserNotificationMessage } from './types'

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
query($templates: NotificationTemplates!) {
  notifications(templates:$templates) {
    id
    type
    severity
    text
    moreLink
  }
}
`
