/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ObjectType, InputType, ID } from 'type-graphql'
import { simpleResolvers } from '../config'

@ObjectType({
  description: 'A type that describes a Notification',
  simpleResolvers: simpleResolvers.Notification
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

@InputType({ description: 'Input object for Notification template used in Query notifications' })
export class NotificationTemplates {
  @Field()
  unconfirmedPeriods: string

  @Field()
  forecast: string
}

export interface INotificationTemplates {
  unconfirmedPeriods: string
  forecast: string
}

/**
 * Variables for query notifications
 */
export interface INotificationsQueryVariables {
  locale: string
  templates: INotificationTemplates
}
