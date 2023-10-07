import 'reflect-metadata'
import { Field, ID, ObjectType } from 'type-graphql'
import { SubscriptionSettings } from './SubscriptionSettings'

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
}
