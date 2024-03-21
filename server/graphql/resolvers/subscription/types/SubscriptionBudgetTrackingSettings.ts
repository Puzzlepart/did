/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, InputType, ObjectType } from 'type-graphql'

/**
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes Subscription budget tracking settings'
})
export class SubscriptionBudgetTrackingSettings {
  @Field({ nullable: true })
  enabled?: boolean
}

/**
 * @category GraphQL InputType
 */
@InputType({
  description: 'A input that describes Subscription budget tracking settings'
})
export class SubscriptionBudgetTrackingSettingsInput {
  @Field({ nullable: true })
  enabled?: boolean
}
