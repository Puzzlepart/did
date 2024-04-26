/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, InputType, ObjectType } from 'type-graphql'

/**
 * @category GraphQL ObjectType
 */

@ObjectType({
  description: 'A type that describes Subscription projects settings'
})
export class SubscriptionProjectsSettings {
  @Field({ nullable: true, defaultValue: 1 })
  keyMaxLength?: number

  @Field({ nullable: true, defaultValue: false })
  enableResourceManagement?: boolean

  @Field(() => [String], { nullable: true })
  resourceMetadata?: string[]
}

/**
 * @category GraphQL InputType
 */

@InputType({
  description: 'A input that describes Subscription projects settings'
})
export class SubscriptionProjectsSettingsInput {
  @Field({ nullable: true, defaultValue: 1 })
  keyMaxLength?: number

  @Field({ nullable: true, defaultValue: false })
  enableResourceManagement?: boolean

  @Field(() => [String], { nullable: true })
  resourceMetadata?: string[]
}
