/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, InputType, ObjectType } from 'type-graphql'

/**
 * A type that describes Subscription projects settings. This type is used
 * to describe the settings for projects in a subscription. These settings
 * are used to configure the behavior of projects in the subscription.
 *
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes Subscription projects settings'
})
export class SubscriptionProjectsSettings {
  /**
   * Show my projects by default for all users
   */
  @Field({ nullable: true, defaultValue: false })
  showMyProjectsByDefault?: boolean

  @Field({ nullable: true, defaultValue: 1 })
  keyMaxLength?: number

  @Field({ nullable: true, defaultValue: false })
  enableResourceManagement?: boolean

  @Field(() => [String], { nullable: true })
  resourceMetadata?: string[]

  @Field({ nullable: true, defaultValue: false })
  enableInvoiceEstimation?: boolean

  @Field({ nullable: true, defaultValue: false })
  enableProjectRoles?: boolean

  /**
   * Enable simple hierarchy for projects. If this is enabled, projects
   * can be organized in a simple hierarchy of parent and child projects.
   */
  @Field({ nullable: true, defaultValue: false })
  enableSimpleHierachy?: boolean

  /**
   * Enable automatic loading of time entries for projects.
   */
  @Field({ nullable: true, defaultValue: false })
  autoLoadTimeEntries?: boolean
}

/**
 * @category GraphQL InputType
 */

@InputType({
  description: 'A input that describes Subscription projects settings'
})
export class SubscriptionProjectsSettingsInput {
  /**
   * Show my projects by default for all users
   */
  @Field({ nullable: true, defaultValue: false })
  showMyProjectsByDefault?: boolean

  @Field({ nullable: true, defaultValue: 1 })
  keyMaxLength?: number

  @Field({ nullable: true, defaultValue: false })
  enableResourceManagement?: boolean

  @Field(() => [String], { nullable: true })
  resourceMetadata?: string[]

  @Field({ nullable: true, defaultValue: false })
  enableInvoiceEstimation?: boolean

  @Field({ nullable: true, defaultValue: false })
  enableProjectRoles?: boolean

  /**
   * Enable simple hierarchy for projects. If this is enabled, projects
   * can be organized in a simple hierarchy of parent and child projects.
   */
  @Field({ nullable: true, defaultValue: false })
  enableSimpleHierachy?: boolean

  /**
   * Enable automatic loading of time entries for projects.
   */
  @Field({ nullable: true, defaultValue: false })
  autoLoadTimeEntries?: boolean
}
