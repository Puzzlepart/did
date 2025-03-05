import 'reflect-metadata'
import { Field, InputType, ObjectType } from 'type-graphql'
import { Subscription } from './Subscription'

/**
 * @category GraphQL InputType
 */
@InputType({
  description: 'Input object for External User Invitation'
})
export class ExternalUserInvitationInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  mail?: string

  @Field({ nullable: true })
  role?: string

  @Field({ nullable: true })
  invitedAt?: Date

  @Field({ nullable: true })
  invitedBy?: string

  @Field({ nullable: true })
  provider?: string

  @Field({ nullable: true })
  status?: 'pending' | 'expired'

  /**
   * Language to be used by the user.
   * This is hardcoded to 'en-GB' for now.
   */
  preferredLanguage?: string

  /**
   * Start page for the user.
   * This is hardcoded to '/reports' for now.
   */
  startPage?: string

  /**
   * Theme to be used by the user.
   * This is harcoded to 'auto' for now.
   */
  theme?: string

  /**
   * Subscription to be associated with the
   * user invitation.
   */
  subscription?: Subscription
}

/**
 * @category GraphQL InputType
 */
@ObjectType({
  description: 'A type that describes External User Invitation'
})
export class ExternalUserInvitation {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  mail?: string

  @Field({ nullable: true })
  role?: string

  @Field({ nullable: true })
  invitedAt?: Date

  @Field({ nullable: true })
  invitedBy?: string

  @Field({ nullable: true })
  provider?: string

  @Field({ nullable: true })
  status?: 'pending' | 'expired'
}
