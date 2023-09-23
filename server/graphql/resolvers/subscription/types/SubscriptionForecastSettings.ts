/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, InputType, ObjectType } from 'type-graphql'

/**
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes Subscription forecast settings'
})
export class SubscriptionForecastSettings {
  @Field({ nullable: true })
  enabled?: boolean

  @Field({ nullable: true })
  notifications?: number
}

@InputType({
  description: 'A input that describes Subscription forecast settings'
})
export class SubscriptionForecastSettingsInput {
  @Field({ nullable: true })
  enabled?: boolean

  @Field({ nullable: true })
  notifications?: number
}
