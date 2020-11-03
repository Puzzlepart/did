/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType({ description: 'A type that describes SubscriptionForecastSettings' })
export class SubscriptionForecastSettings {
  @Field()
  enabled: boolean

  @Field()
  notifications: number
}

@ObjectType({ description: 'A type that describes SubscriptionSettings' })
export class SubscriptionSettings {
  @Field(() => SubscriptionForecastSettings)
  forecast: SubscriptionForecastSettings
}

@InputType({ description: 'A input that describes SubscriptionForecastSettings' })
export class SubscriptionForecastSettingsInput {
  @Field()
  enabled: boolean

  @Field()
  notifications: number
}

@InputType({ description: 'A type that describes SubscriptionSettings' })
export class SubscriptionSettingsInput {
  @Field(() => SubscriptionForecastSettingsInput)
  forecast: SubscriptionForecastSettingsInput
}

@ObjectType({ description: 'A type that describes a Subscription' })
export class Subscription {
  @Field()
  id: string

  @Field()
  name: string
}
