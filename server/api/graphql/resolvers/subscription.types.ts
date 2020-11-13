/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, InputType, ObjectType } from 'type-graphql'
import { simpleResolvers } from '../config'

@ObjectType({ description: 'A type that describes SubscriptionForecastSettings' })
export class SubscriptionForecastSettings {
  @Field({ nullable: true })
  enabled?: boolean

  @Field({ nullable: true })
  notifications?: number
}

@ObjectType({ description: 'A type that describes SubscriptionSettings' })
export class SubscriptionSettings {
  @Field(() => SubscriptionForecastSettings, { nullable: true })
  forecast?: SubscriptionForecastSettings
}

@InputType({ description: 'A input that describes SubscriptionForecastSettings' })
export class SubscriptionForecastSettingsInput {
  @Field({ nullable: true })
  enabled?: boolean

  @Field({ nullable: true })
  notifications?: number
}

@InputType({ description: 'A type that describes SubscriptionSettings' })
export class SubscriptionSettingsInput {
  @Field(() => SubscriptionForecastSettingsInput, { nullable: true })
  forecast?: SubscriptionForecastSettingsInput
}

@ObjectType({ description: 'A type that describes a Subscription', simpleResolvers: simpleResolvers.Subscription })
export class Subscription {
  @Field()
  id: string

  @Field()
  name: string

  @Field(() => SubscriptionSettings, { nullable: true })
  settings?: SubscriptionSettings

  /**
   * Connection string for the subscription storage
   */
  connectionString?: string
}
