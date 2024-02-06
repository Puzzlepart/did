/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, InputType, ObjectType } from 'type-graphql'

/**
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes Subscription Teams settings'
})
export class SubscriptionTeamsSettings {
  @Field({ nullable: true })
  enabled?: boolean

  @Field({ nullable: true })
  missingSubmissionsEnabled?: boolean

  @Field({ nullable: true })
  missingSubmissionsSinglePeriodText?: string

  @Field({ nullable: true })
  missingSubmissionsMultiplePeriodsText?: string
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

  @Field({ nullable: true })
  missingSubmissionsEnabled?: boolean

  @Field({ nullable: true })
  missingSubmissionsSinglePeriodText?: string

  @Field({ nullable: true })
  missingSubmissionsMultiplePeriodsText?: string
}
