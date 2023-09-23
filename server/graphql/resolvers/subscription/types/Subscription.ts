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
