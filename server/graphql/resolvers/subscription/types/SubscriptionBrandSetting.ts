/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, InputType, ObjectType } from 'type-graphql'

/**
 * @category GraphQL ObjectType
 */

@ObjectType({
  description: 'A type that describes Subscription brand settings'
})
export class SubscriptionBrandSetting {
  @Field({ nullable: true })
  navBackground?: string
  
  @Field({ nullable: true })
  logoSrc?: string
}

/**
 * @category GraphQL InputType
 */

@InputType({
  description: 'A input that describes Subscription brand settings'
})
export class SubscriptionBrandSettingInput {
  @Field({ nullable: true })
  navBackground?: string

  @Field({ nullable: true })
  logoSrc?: string
}
