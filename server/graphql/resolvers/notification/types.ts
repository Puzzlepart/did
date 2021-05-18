/* eslint-disable tsdoc/syntax */
/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType
} from 'type-graphql'

enum NotificationSeverity {
  LOW,
  MEDIUM,
  HIGH
}

enum NotificationType {
  WEEK_NOT_CONFIRMED,
  MISSING_FORECAST
}

registerEnumType(NotificationSeverity, {
  name: 'NotificationSeverity',
  description: 'Notification severity',
  valuesConfig: {
    LOW: {
      description: 'Low severity'
    },
    MEDIUM: {
      description: 'Medium severity'
    },
    HIGH: {
      description: 'High severity'
    }
  }
})

registerEnumType(NotificationType, {
  name: 'NotificationType',
  description: 'Notification type',
  valuesConfig: {
    WEEK_NOT_CONFIRMED: {
      description: 'Week not confirmed notification'
    },
    MISSING_FORECAST: {
      description: 'Missing forecast notification'
    }
  }
})

/**
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes a Notification',
  simpleResolvers: true
})
export class Notification {
  @Field(() => ID)
  id: string

  @Field(() => NotificationType)
  type: string

  @Field(() => NotificationSeverity)
  severity: string

  @Field()
  text: string

  @Field()
  moreLink: string
}

/**
 * @category GraphQL InputType
 */
@InputType({
  description:
    'Input object for Notification template used in Query notifications'
})
export class NotificationTemplates {
  @Field()
  unconfirmedPeriods: string

  @Field()
  forecast: string
}

/**
 * @ignore
 */
export interface INotificationTemplates {
  unconfirmedPeriods: string
  forecast: string
}

/**
 * Variables for query notifications
 *
 * @ignore
 */
export interface INotificationsQueryVariables {
  locale: string
  templates: INotificationTemplates
}
