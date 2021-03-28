/* eslint-disable tsdoc/syntax */
/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { Subscription } from '../subscription/types'
import { BaseResult, Role } from '../types'

/**
 * A type that describes a User photo
 *
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes a User photo',
  simpleResolvers: true
})
export class UserPhoto {
  @Field({
    description: 'Base64 representation of the User photo',
    nullable: true
  })
  base64?: string
}

/**
 * A type that describes a User
 *
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes a User',
  simpleResolvers: true
})
export class User {
  _id?: string

  @Field(() => ID, { nullable: true })
  id?: string

  @Field({ nullable: true })
  displayName?: string

  @Field({ nullable: true })
  givenName?: string

  @Field({ nullable: true })
  surname?: string

  @Field({ nullable: true })
  jobTitle?: string

  @Field({ nullable: true })
  mobilePhone?: string

  @Field({ nullable: true })
  mail?: string

  @Field({ nullable: true })
  startPage?: string

  @Field({ nullable: true })
  preferredLanguage?: string

  @Field({ nullable: true })
  hiddenFromReports?: boolean

  @Field(() => Role, { nullable: true })
  role?: Role | string

  @Field(() => Subscription, { nullable: true })
  subscription?: Subscription

  @Field(() => String, { nullable: true })
  configuration?: any

  @Field({ nullable: true })
  provider?: string

  @Field({ nullable: true })
  photo?: UserPhoto

  public create?(user: User): User {
    Object.assign(this, user)
    return this
  }
}

/**
 * @category GraphQL InputType
 */
@InputType({
  description: 'Input object for Role used in Mutation addOrUpdateUser/addUsers'
})
export class UserInput {
  @Field()
  id?: string

  @Field({ nullable: true })
  displayName?: string

  @Field({ nullable: true })
  givenName?: string

  @Field({ nullable: true })
  surname?: string

  @Field({ nullable: true })
  jobTitle?: string

  @Field({ nullable: true })
  mobilePhone?: string

  @Field({ nullable: true })
  mail?: string

  @Field({ nullable: true })
  startPage?: string

  @Field({ nullable: true })
  preferredLanguage?: string

  @Field({ nullable: true })
  hiddenFromReports?: boolean

  @Field({ nullable: true })
  role?: string

  @Field({ nullable: true })
  provider?: string
}
/**
 * @category GraphQL InputType
 */
@InputType({ description: 'Input object for User query' })
export class UserQuery {
  @Field({ nullable: true })
  role?: string

  @Field({ nullable: true })
  hiddenFromReports?: boolean
}

/**
 * @category GraphQL InputType
 */
@InputType({ description: 'Input object for User feedback report' })
export class UserFeedbackReporter {
  @Field({ nullable: true })
  displayName?: string

  @Field({ nullable: true })
  mail?: string
}

/**
 * @category GraphQL InputType
 */
@InputType({ description: 'Input object for User feedback' })
export class UserFeedback {
  @Field()
  title: string

  @Field()
  body: string

  @Field({ nullable: true })
  mood?: string

  @Field(() => [String], { nullable: true })
  labels?: string[]

  @Field(() => UserFeedbackReporter, { nullable: true })
  reporter?: UserFeedbackReporter
}

/**
 * @category GraphQL ObjectType
 */
@ObjectType({ description: 'A type that describes the User feedback result' })
export class UserFeedbackResult extends BaseResult {
  @Field({ nullable: true })
  ref?: number
}
