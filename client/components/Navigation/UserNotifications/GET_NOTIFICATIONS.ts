import { ITypedHash } from '@pnp/common'
import gql from 'graphql-tag'
import { INotification } from './types'

/**
 * @ignore
 */
export interface IGetNotifications {
  notifications: INotification[]
}
/**
 * @ignore
 */
export interface IGetNotificationsVariables {
  templates: ITypedHash<string>;
  locale: string;
}

/**
 * @ignore
 */
export default gql`
  query($templates: NotificationTemplates!, $locale: String!) {
    notifications(templates: $templates, locale: $locale) {
      id
      type
      severity
      text
      moreLink
    }
  }
`
