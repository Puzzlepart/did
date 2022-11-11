/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'

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
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes Subscription vacation settings'
})
export class SubscriptionVacationSettings {
  @Field({ nullable: true, defaultValue: 25 })
  totalDays?: number

  @Field({ nullable: true })
  eventCategory?: string
}

/**
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes Subscription Teams settings'
})
export class SubscriptionTeamsSettings {
  @Field({ nullable: true })
  enabled?: boolean
}

/**
 * @category GraphQL ObjectType
 */
@ObjectType({ description: 'A type that describes Subscription settings' })
export class SubscriptionSettings {
  @Field(() => SubscriptionForecastSettings, { nullable: true })
  forecast?: SubscriptionForecastSettings

  @Field(() => SubscriptionADSyncSettings, { nullable: true })
  adsync?: SubscriptionADSyncSettings

  @Field(() => SubscriptionVacationSettings, { nullable: true })
  vacation?: SubscriptionVacationSettings

  @Field(() => SubscriptionTeamsSettings, { nullable: true })
  teams?: SubscriptionTeamsSettings
}

/**
 * @category GraphQL ObjectType
 */
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

  @Field({ nullable: true })
  owner: string

  @Field(() => SubscriptionSettings, { nullable: true })
  settings?: SubscriptionSettings

  /**
   * Database name
   */
  db?: string
}

/**
 * @category GraphQL InputType
 */
@InputType({
  description: 'A input that describes Subscription forecast settings'
})
export class SubscriptionForecastSettingsInput {
  @Field({ nullable: true })
  enabled?: boolean

  @Field({ nullable: true })
  notifications?: number
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

/**
 * @category GraphQL InputType
 */
@InputType({
  description: 'A input that describes Subscription vacation settings'
})
export class SubscriptionVacationSettingsInput {
  @Field({ nullable: true, defaultValue: 25 })
  totalDays?: number

  @Field({ nullable: true })
  eventCategory?: string
}

/**
 * @category GraphQL InputType
 */
@InputType({
  description: 'A input that describes Subscription Teams settings'
})
export class SubscriptionTeamsSettingsInput {
  @Field({ nullable: true })
  enabled?: boolean
}

/**
 * @category GraphQL InputType
 */
@InputType({ description: 'A type that describes Subscription AD settings' })
export class SubscriptionSettingsInput {
  @Field(() => SubscriptionForecastSettingsInput, { nullable: true })
  forecast?: SubscriptionForecastSettingsInput

  @Field(() => SubscriptionADSyncSettingsInput, { nullable: true })
  adsync?: SubscriptionADSyncSettingsInput

  @Field(() => SubscriptionVacationSettingsInput, { nullable: true })
  vacation?: SubscriptionVacationSettingsInput

  @Field(() => SubscriptionTeamsSettingsInput, { nullable: true })
  teams?: SubscriptionTeamsSettingsInput
}
