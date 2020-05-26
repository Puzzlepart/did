
import gql from 'graphql-tag'
import { INotification } from './types'

/**
 * @ignore
 */
export interface IGetNotifications {
  notifications: INotification[];
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
