/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, InputType, ObjectType } from 'type-graphql'

/**
 * @category GraphQL ObjectType
 */

@ObjectType({
  description: 'A type that describes Subscription customers settings'
})
export class SubscriptionCustomersSettings {
  @Field({ nullable: true, defaultValue: 1 })
  keyMaxLength?: number
}

/**
 * @category GraphQL InputType
 */

@InputType({
  description: 'A input that describes Subscription customers settings'
})
export class SubscriptionCustomersSettingsInput {
  @Field({ nullable: true, defaultValue: 1 })
  keyMaxLength?: number
}
