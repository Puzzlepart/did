/* eslint-disable max-classes-per-file */
import { GraphQLDateTime } from 'graphql-scalars'
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { Subscription } from '../subscription/types/Subscription'
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
 * A type that describes a ActiveDirectoryUser
 *
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes a ActiveDirectoryUser',
  simpleResolvers: true
})
export class ActiveDirectoryUser {
  @Field(() => ID)
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
  preferredLanguage?: string

  @Field({ nullable: true })
  accountEnabled?: boolean
}

@ObjectType({
  description: 'A type that describes a User timebank entry',
  simpleResolvers: true
})
export class UserTimebankEntry {
  @Field({ nullable: false })
  balanceAdjustment?: number

  @Field({ nullable: false })
  id?: string
}

@ObjectType({
  description: 'A type that describes a User timebank',
  simpleResolvers: true
})
export class UserTimebank {
  @Field({ nullable: true })
  balance?: number

  @Field(() => GraphQLDateTime, { nullable: true })
  lastUpdated?: Date

  @Field(() => [UserTimebankEntry], { nullable: true })
  entries?: UserTimebankEntry[]
}

@InputType({
  description: 'A type that describes a User timebank entry input'
})
export class UserTimebankEntryInput {
  @Field({ nullable: false })
  balanceAdjustment?: number

  @Field({ nullable: false })
  id?: string

  @Field(() => [UserTimebankEntryInput], { nullable: false })
  entries?: UserTimebankEntryInput[]
}

@InputType({
  description: 'A input type that describes a User timebank'
})
export class UserTimebankInput {
  @Field({ nullable: true })
  balance?: number

  @Field(() => GraphQLDateTime, { nullable: true })
  lastUpdated?: Date
}

@ObjectType({ description: 'A type that describes a User timebank result' })
export class UpdateUserTimebankResult extends BaseResult {
  @Field({ nullable: true })
  balance?: number
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

  @Field(() => GraphQLDateTime, { nullable: true })
  lastActive?: Date

  @Field({ nullable: true })
  accountEnabled?: boolean

  @Field(() => GraphQLDateTime, { nullable: true })
  employmentStartDate?: Date

  @Field(() => GraphQLDateTime, { nullable: true })
  employmentEndDate?: Date

  /**
   * If the user is enrolled in did through a security group,
   * this will be the security group id.
   */
  @Field({ nullable: true })
  securityGroupId?: string

  @Field(() => UserTimebank, { nullable: true })
  timebank?: UserTimebank

  @Field(() => User, { nullable: true })
  manager?: User
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

  @Field(() => GraphQLDateTime, { nullable: true })
  lastActive?: Date

  @Field({ nullable: true })
  preferredLanguage?: string

  @Field({ nullable: true })
  hiddenFromReports?: boolean

  @Field({ nullable: true })
  role?: string

  @Field({ nullable: true })
  provider?: string

  @Field({ nullable: true })
  accountEnabled?: boolean

  @Field(() => GraphQLDateTime, { nullable: true })
  employmentStartDate?: Date

  @Field(() => GraphQLDateTime, { nullable: true })
  employmentEndDate?: Date

  /**
   * If the user is enrolled in did through a security group,
   * this will be the security group id.
   */
  @Field({ nullable: true })
  securityGroupId?: string

  @Field(() => UserTimebankInput, { nullable: true })
  timebank?: UserTimebankInput
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

  @Field({ nullable: true })
  label?: string

  @Field(() => UserFeedbackReporter, { nullable: true })
  reporter?: UserFeedbackReporter

  @Field({ nullable: true })
  anonymous?: boolean

  @Field({ nullable: true })
  hasGitHubUser?: boolean

  @Field({ nullable: true })
  gitHubUsername?: string
}

/**
 * @category GraphQL ObjectType
 */
@ObjectType({ description: 'A type that describes the User feedback result' })
export class UserFeedbackResult extends BaseResult {
  @Field({ nullable: true })
  ref?: number
}
