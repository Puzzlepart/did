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

  @Field({ nullable: true })
  domainRestrictionEnabled?: boolean

  @Field({ nullable: true })
  domainRestriction?: string

  @Field({ nullable: true })
  domainRestrictionExternalEnabled?: boolean

  @Field(() => [String], { nullable: true })
  domainRestrictionExternal?: string[]
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

  /**
   * Enable domain restriction for internal users
   */
  @Field({ nullable: true })
  domainRestrictionEnabled?: boolean

  /**
   * Domain restriction for internal users
   */
  @Field({ nullable: true })
  domainRestriction?: string

  /**
   * Enable external domain restriction
   */
  @Field({ nullable: true })
  domainRestrictionExternalEnabled?: boolean

  /**
   * External domains that are allowed to be invited
   * as external users to the subscription.
   */
  @Field(() => [String], { nullable: true })
  domainRestrictionExternal?: string[]
}
