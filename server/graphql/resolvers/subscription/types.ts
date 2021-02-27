/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'

@ObjectType({
  description: 'A type that describes Subscription forecast settings'
})
export class SubscriptionForecastSettings {
  @Field({ nullable: true })
  enabled?: boolean

  @Field({ nullable: true })
  notifications?: number
}

@ObjectType({
  description: 'A type that describes Subscription AD sync settings'
})
export class SubscriptionADSyncSettings {
  @Field({ nullable: true })
  adUserSyncEnabled?: boolean

  @Field(() => [String], { nullable: true })
  adUserSyncProperties?: string[]
}

@ObjectType({ description: 'A type that describes Subscription settings' })
export class SubscriptionSettings {
  @Field(() => SubscriptionForecastSettings, { nullable: true })
  forecast?: SubscriptionForecastSettings

  @Field(() => SubscriptionADSyncSettings, { nullable: true })
  adsync?: SubscriptionADSyncSettings
}

@ObjectType({
  description: 'A type that describes a Subscription',
  simpleResolvers: true
})
export class Subscription {
  _id?: string

  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field(() => SubscriptionSettings, { nullable: true })
  settings?: SubscriptionSettings

  /**
   * Database name
   */
  db?: string
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

@InputType({
  description: 'A input that describes Subscription AD sync settings'
})
export class SubscriptionADSyncSettingsInput {
  @Field({ nullable: true })
  adUserSyncEnabled?: boolean

  @Field(() => [String], { nullable: true })
  adUserSyncProperties?: string[]
}

@InputType({ description: 'A type that describes Subscription AD settings' })
export class SubscriptionSettingsInput {
  @Field(() => SubscriptionForecastSettingsInput, { nullable: true })
  forecast?: SubscriptionForecastSettingsInput

  @Field(() => SubscriptionADSyncSettingsInput, { nullable: true })
  adsync?: SubscriptionADSyncSettingsInput
}
