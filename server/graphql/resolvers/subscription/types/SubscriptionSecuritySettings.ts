/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, InputType, ObjectType } from 'type-graphql'

/**
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes Subscription security settings'
})
export class SubscriptionSecuritySettings {
  /**
   * Total number of vacation days per year
   */
  @Field({
    nullable: true,
    defaultValue: '00000000-0000-0000-0000-000000000000'
  })
  securityGroupId?: string
}

/**
 * @category GraphQL InputType
 */
@InputType({
  description: 'A input that describes Subscription security settings'
})
export class SubscriptionSecuritySettingsInput {
  /**
   * Total number of vacation days per year
   */
  @Field({
    nullable: true,
    defaultValue: '00000000-0000-0000-0000-000000000000'
  })
  securityGroupId?: string
}
