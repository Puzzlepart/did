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
   * Enable security group membership check
   */
  @Field({ nullable: true })
  securityGroupEnabled?: boolean

  /**
   * Security group ID (Microsoft Entra ID)
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
   * Enable security group membership check
   */
  @Field({ nullable: true })
  securityGroupEnabled?: boolean
  /**
   * Security group ID (Microsoft Entra ID)
   */
  @Field({
    nullable: true,
    defaultValue: '00000000-0000-0000-0000-000000000000'
  })
  securityGroupId?: string
}
