/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, InputType, ObjectType } from 'type-graphql'

/**
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes Subscription timesheet settings'
})
export class SubscriptionTimesheetSettings {
  @Field({ nullable: true, defaultValue: 'dddd DD' })
  dayFormat?: string

  @Field({ nullable: true, defaultValue: 'HH:mm' })
  timeFormat?: string
}

/**
 * @category GraphQL InputType
 */
@InputType({
  description: 'A input that describes Subscription vacation settings'
})
export class SubscriptionTimesheetSettingsInput {
  @Field({ nullable: true, defaultValue: 'dddd DD' })
  dayFormat?: string

  @Field({ nullable: true, defaultValue: 'HH:mm' })
  timeFormat?: string
}
