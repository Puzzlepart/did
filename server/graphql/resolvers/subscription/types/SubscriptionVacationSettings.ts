/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, InputType, ObjectType } from 'type-graphql'

/**
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes Subscription vacation settings'
})
export class SubscriptionVacationSettings {
  /**
   * Total number of vacation days per year
   */
  @Field({ nullable: true, defaultValue: 25 })
  totalDays?: number

  /**
   * Vacation calculation type (`planned` or `actual`)
   */
  @Field({ nullable: true, defaultValue: 'planned' })
  calculationType?: string

  /**
   * Event category to use for vacation events
   */
  @Field({ nullable: true })
  eventCategory?: string
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

  @Field({ nullable: true, defaultValue: 'planned' })
  calculationType?: string

  @Field({ nullable: true })
  eventCategory?: string
}
