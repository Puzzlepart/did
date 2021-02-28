/* eslint-disable tsdoc/syntax */
/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'

/**
 * @category ObjectType
 */
@ObjectType({
  description: 'A type that describes a Notification',
  simpleResolvers: true
})
export class Notification {
  @Field(() => ID)
  id: string

  @Field()
  type: number

  @Field()
  severity: number

  @Field()
  text: string

  @Field()
  moreLink: string
}

/**
 * @category InputType
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
