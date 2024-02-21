/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, InputType, ObjectType } from 'type-graphql'

/**
 * @category GraphQL ObjectType
 */

@ObjectType({
  description: 'A type that describes Subscription AD sync settings'
})
export class SubscriptionADSyncSettings {
  @Field({ nullable: true })
  enabled?: boolean

  @Field(() => [String], { nullable: true })
  properties?: string[]

  @Field({ nullable: true })
  syncUserPhoto?: boolean
}

/**
 * @category GraphQL InputType
 */

@InputType({
  description: 'A input that describes Subscription AD sync settings'
})
export class SubscriptionADSyncSettingsInput {
  @Field({ nullable: true })
  enabled?: boolean

  @Field(() => [String], { nullable: true })
  properties?: string[]

  @Field({ nullable: true })
  syncUserPhoto?: boolean
}
