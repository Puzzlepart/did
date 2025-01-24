import 'reflect-metadata'
import { Field, ID, ObjectType } from 'type-graphql'
import { SubscriptionSettings } from './SubscriptionSettings'

@ObjectType({
  description: 'A type that describes a locked period',
  simpleResolvers: true
})
export class LockedPeriod {
  /**
   * Unique ID of the locked period.
   */
  @Field({ nullable: false })
  periodId: string

  /**
   * The reason for locking the period.
   */
  @Field({ nullable: true })
  reason?: string

  /**
   * The user who locked the period.
   */
  @Field({ nullable: true })
  lockedBy?: string

  /**
   * The date the period was locked.
   */
  @Field({ nullable: true })
  lockedAt?: Date
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

  /**
   * Unique ID of the subscription.
   */
  @Field(() => ID)
  id: string

  /**
   * Unique name of the subscription.
   */
  @Field()
  name: string

  /**
   * The owner of the subscription, to enable login for the first time.
   */
  @Field({ nullable: true })
  owner: string

  /*
   * The settings for the subscription.
   */
  @Field(() => SubscriptionSettings, { nullable: true })
  settings?: SubscriptionSettings

  /**
   * Database name for the subscription.
   */
  db?: string

  /**
   * The locked periods for the subscription.
   */
  @Field(() => [LockedPeriod], { nullable: true })
  lockedPeriods?: LockedPeriod[]
}
