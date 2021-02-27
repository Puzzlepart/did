/* eslint-disable tsdoc/syntax */
/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { Subscription } from '../subscription/types'
import { Role } from '../types'

/**
 * @category ObjectType
 */
@ObjectType({
  description: 'A type that describes a User',
  simpleResolvers: true
})
export class User {
  _id?: string

  @Field(() => ID)
  id?: string

  @Field()
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

  @Field(() => Role)
  role?: Role | string

  @Field(() => Subscription)
  subscription?: Subscription

  @Field(() => String)
  configuration?: any

  public create?(user: User): User {
    Object.assign(this, user)
    return this
  }
}

/**
 * @category InputType
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
  preferredLanguage?: string

  @Field({ nullable: true })
  role?: string
}

/**
 * @category InputType
 */
@InputType({ description: 'Input object for User query options' })
export class UserQueryOptions {
  @Field({ nullable: true })
  sortBy?: string
}

/**
 * @category InputType
 */
@InputType({ description: 'Input object for User query' })
export class UserQuery {
  @Field({ nullable: true })
  role?: string
}
